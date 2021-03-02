AFRAME.registerComponent('grabbable', {
  schema: {
    target: {type: 'selector'}
  },
  init: function () {
    this.initialPos = {...this.el.object3D.position};
    this.targetPos = new THREE.Vector3();
    this.targetRot = new THREE.Quaternion();
    this.pos = new THREE.Vector3();
    //this.rot = new THREE.Quaternion();
    this.target = null;
    this.el.addEventListener('click', evt => this.grab(evt));
    this.manageMultiGrab();
    // Is something else steal the grabbed element, ungrab it
    this.el.addEventListener('loseOwnership', evt => this.ungrab());
    // todo: remove
  },
  manageMultiGrab: function () {
    // if something else is grabbed on the same target, ungrab the current grabbed element
    this.el.sceneEl.addEventListener('grabbed', evt => {
      let grabbedEl = evt.target;
      if (grabbedEl != this.el && this.data.target == grabbedEl.components.grabbable.data.target) {
        this.ungrab();
      }
    });
  },
  grab: function (evt) {
    if (this.target) return;
    this.target = this.data.target;
    this.el.emit('grabbed');
  },
  ungrab: function () {
    if (!this.target) return;
    this.target = null;
    this.el.emit('ungrabbed');
  },
  reset: function () {
    this.ungrab();
    this.el.object3D.position.set(this.initialPos.x, this.initialPos.y, this.initialPos.z);
  },
  tick: function () {
    if (!this.target) return;
    // calculate distance to target
    this.target.object3D.getWorldPosition(this.targetPos);
    this.el.object3D.getWorldPosition(this.pos);
    this.pos.sub(this.targetPos);
    // apply the calcultated distance to the entity
    this.el.object3D.position.sub(this.pos);
    // and copy rotation
    this.el.object3D.rotation.copy(this.target.object3D.rotation);
  }
});