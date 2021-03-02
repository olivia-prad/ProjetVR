AFRAME.registerPrimitive('a-chessboard',  {
  defaultComponents: {
    'chessboard': {}
  },

  // Defined mappings from HTML attributes to component properties (using dots as delimiters).
  mappings: {
    size: 'chessboard.size',
    edge: 'chessboard.edge',
    height: 'chessboard.height',
    color: 'chessboard.color',
    bevel: 'chessboard.bevel'
  }
});

AFRAME.registerComponent('chessboard', {
  schema: {
    size: {type: 'int', default: 8},
    edge: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    color: {type: 'color', default: "white"},
    bevel: {type: 'boolean', default: true},
  },
  init: function () {
    console.log("chessboard init");
    this.genVertices();
    this.genShape();
    this.genGeometry();
    this.genMaterial();
    this.genMesh();
    this.genChessboard();
    this.el.setObject3D('mesh', this.chessboard);
  },
  genVertices: function () {
    // 4 vertices for a square
    this.vertices = [];
    this.vertices.push(new THREE.Vector2(0, 0));
    this.vertices.push(new THREE.Vector2(this.data.edge, 0));
    this.vertices.push(new THREE.Vector2(this.data.edge, this.data.edge));
    this.vertices.push(new THREE.Vector2(0, this.data.edge));
  },
  genShape: function () {
    this.shape = new THREE.Shape();
    this.shape.moveTo(this.vertices[0].x, this.vertices[0].y);
    this.shape.lineTo(this.vertices[1].x, this.vertices[1].y);
    this.shape.lineTo(this.vertices[2].x, this.vertices[2].y);
    this.shape.lineTo(this.vertices[3].x, this.vertices[3].y);
    this.shape.lineTo(this.vertices[0].x, this.vertices[0].y);
  },
  genGeometry: function () {
    this.geometrySettings = {
      steps: 1,
      depth: this.data.height,
      bevelEnabled: this.data.bevel, //cost: 16 triangles
      bevelThickness: this.data.edge / 10,
      bevelSize: this.data.edge / 10,
      bevelOffset: 0,
      bevelSegments: 1
    };
    this.geometry = new THREE.ExtrudeGeometry(this.shape, this.geometrySettings);
  },
  genMaterial: function() {
    this.material = new THREE.MeshLambertMaterial({
      color: new THREE.Color(this.data.color)
    });
  },
  genMesh: function () {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    this.mesh.scale.set(0.95, 0.95, 1);
  },
  genChessboard: function () {
    this.chessboard = new THREE.Group();
    for (let row = 0; row < this.data.size; row++) {
      for (let col = 0; col < this.data.size; col++) {
      let mesh = this.mesh.clone();
      mesh.position.set(col*this.data.edge, 0, -row*this.data.edge);
      this.chessboard.add(mesh);
      }
    }
  }
});