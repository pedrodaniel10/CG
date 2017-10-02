var TORUS_SIZE = 10;
var TORUS_RADIUS = 3;

function addFieldTorus(obj, x, y, z) {
  'use strict';
  geometry = new THREE.TorusGeometry(TORUS_SIZE, TORUS_RADIUS, 16, 32);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.rotation.x = Math.PI / 2;
  obj.add(mesh);
}

function addFieldTorusStack(obj, x, y, z) {
    'use strict';
    let nTorus = Math.floor(3 + 3*Math.random());
    for (let i = 0; i < nTorus; i++) {
        addFieldTorus(obj, x, y + i*TORUS_RADIUS, z);
    }
}

function createField(x, y, z) {
  'use strict';
  var field = new THREE.Object3D();
  material = new THREE.MeshBasicMaterial({ color: 0xe68200, wireframe: true });

  addFieldTorusStack(field, 5, 0, -1);

  scene.add(field);
  field.position.x = x;
  field.position.y = y;
  field.position.z = z;
}
