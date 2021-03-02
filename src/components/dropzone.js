AFRAME.registerComponent('dropzone', {
  schema: {
    offset: {type: 'vec3', default: '0 0 0'},
    reset: {type: 'boolean', default: false},
    'reset-timeout': {type: 'int', default: 2000}
  },
  init: function () {
    this.el.addEventListener('click', evt => this.somethingDropped(evt));
    this.offset = new THREE.Vector3(this.data.offset.x, this.data.offset.y, this.data.offset.z);
    //todo: updade offset
  },
  somethingDropped: function (evt) {
    // Find the first grabble element that is actually grabbed
    let grabbableElements = document.querySelectorAll("[grabbable]");
    let grabbedOne = null;
    for (let grabbableElement of grabbableElements) {
      if (grabbableElement.components.grabbable.target) {
        grabbedOne = grabbableElement;
        break;
      }
    }
    if (!grabbedOne) return;
    // ungrab it and set it to the drop position, and reset it after a timeout (if requested)
    grabbedOne.components.grabbable.ungrab();
    let dropPos = new THREE.Vector3();
    dropPos.setFromMatrixPosition(this.el.object3D.matrixWorld);
    dropPos.add(this.offset);
    // apply the calcultated distance to the entity
    grabbedOne.object3D.position.copy(dropPos);
    grabbedOne.emit('dropped', {in: this.el});
    this.el.emit('received', {dropEl: grabbedOne});
    if (this.data.reset) {
      setTimeout(() => {
        grabbedOne.components.grabbable.reset();
      }, this.data['reset-timeout']);
    }
  }
});