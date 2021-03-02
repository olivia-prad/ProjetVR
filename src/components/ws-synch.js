AFRAME.registerComponent('ws-synch', {
  schema: {
    ws: {type: 'string', default: window.location.hostname},
    secure: {type: 'boolean', default: window.location.protocol == 'https:'},
    pool: {type: 'string'},
    unique: {type: 'boolean', default: false}
  },
  init: function () {
    let scene = this.el.sceneEl;
    // connect to WS if not allready connected
    if (!scene.__ws_synch) this.wsInit();
    this.ws = scene.__ws_synch;
    this.poolName = `pool__${this.data.pool}`;
    // todo better entity id management ?
    this.entityId = this.el.getAttribute('id') || scene.__ws_synch_entity_id++;
    this.ws.addEventListener('message', evt => {
      if (!this.el.sceneEl.components[this.poolName] && !this.data.unique) return;
      let data = JSON.parse(evt.data);
      if (!data.message || !data.message.action) return;
      this[`wsOn_${data.message.action}`](data);
    });
    this.worldPos = new THREE.Vector3();
    this.others = new Map();
    this.owned = false;
    this.ownedBy = null;
    // component grabable listener
    this.el.addEventListener('grabbed', evt => this.setOwnership());
    //todo if needed: remove
  },
  setOwnership: function () {
    if (!this.data.unique) return;
    this.owned = true;
    this.el.emit('gainOwnership');
    this.ws.send(JSON.stringify({
      action: 'own',
      eid: this.entityId
    }));
  },
  wsInit: function () {
    let scene = this.el.sceneEl;
    const protocol = this.data.secure ? 'wss:' : 'ws:';
    let url = scene.dataset.wsSynchUrl || `${protocol}//${this.data.ws}`;
    scene.__ws_synch = new WebSocket(url);
    scene.__ws_synch_entity_id = 1;
  },
  wsOn_own: function (data) {
    if (data.message.eid != this.entityId) return;
    if (this.owned) this.el.emit('loseOwnership');
    this.owned = false;
    this.ownedBy = data.cid;
  },
  wsOn_giveOwnership: function (data) {
    const cid = data.cid;
    if (this.ownedBy == cid) this.setOwnership();
  },
  wsOn_move: function (data) {
    const eid = data.message.eid;
    if (eid != this.entityId) return;
    const pos = data.message.pos;
    const rot = data.message.rot;
    if (this.data.unique) {
      this.ownedBy = data.cid;
      this.el.object3D.position.set(pos.x, pos.y, pos.z);
      this.el.setAttribute('rotation', `${rot.x} ${rot.y} ${rot.z}`);
      return;
    }
    // request an entity from the pool for this client id (if not allready done)
    const cid = data.cid;
    if (!this.others.has(cid)) {
      let other = this.el.sceneEl.components[this.poolName].requestEntity();
      other.play();
      this.others.set(cid, other);
    }
    let other = this.others.get(cid);
    other.object3D.position.set(pos.x, pos.y, pos.z);
    other.setAttribute('rotation', `${rot.x} ${rot.y} ${rot.z}`);
  },
  wsOn_drop: function (data) {
    const cid = data.cid;
    if (this.data.unique && this.ownedBy == cid) this.el.emit('ownerDrop');
    if (!this.others.has(cid)) return;
    let other = this.others.get(cid);
    this.el.sceneEl.components[this.poolName].returnEntity(other);
    this.others.delete(cid);
  },
  tick: function () {
    if (this.ws.readyState !== 1) return;
    // do not send data if we are not the owner in "unique" entity mode
    if (this.data.unique && !this.owned) return;
    this.el.object3D.getWorldPosition(this.worldPos);
    if (this.el.components['look-controls'] && this.el.sceneEl.is('vr-mode')) {
      this.worldPos.x += this.el.object3D.position.x;
      this.worldPos.y = this.el.object3D.position.y;
      this.worldPos.z += this.el.object3D.position.z;
    }
    this.ws.send(JSON.stringify({
      action: 'move',
      eid: this.entityId,
      pos: this.worldPos,
      rot: this.el.getAttribute('rotation')
    }));
  }
});
