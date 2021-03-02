AFRAME.registerComponent('navmesh-manager', {
  schema: {
    navmesh: {type: 'string', default: ''}
  },
  update: function (oldData) {
    if (Object.entries(oldData).length === 0) return;
    if (this.data.navmesh === oldData.navmesh) return;
    let teleporters = document.querySelectorAll("[teleport-controls]");
    let navmeshes = document.querySelectorAll("[nav-mesh], [nav-mesh-disable]");
    // update all teleporters to use the new nav-mesh
    for (let teleporter of teleporters) {
      teleporter.setAttribute('teleport-controls', 'collisionEntities', this.data.navmesh);
    }
    // Set the nav-mesh component for movement-controls on the right nav-mesh
    for (let navmesh of navmeshes) {
      navmesh.removeAttribute('nav-mesh');
      navmesh.setAttribute('nav-mesh-disable', '');
    }
    let newNavmesh = document.querySelector(this.data.navmesh);
    newNavmesh.removeAttribute('nav-mesh-disable');
    newNavmesh.setAttribute('nav-mesh', '');
  }
});