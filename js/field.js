function addTorus(obj, x, y, z, r) {
  'use strict';
  geometry = new THREE.TorusGeometry(1, 1, 16, 32);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.rotation.y = r * Math.PI / 2;
  obj.add(mesh);
}

function createField(x, y, z) {
  'use strict';
  var field;

  addTorus(field, 5, 0, -1, 0);

  scene.add(field);
  field.position.x = x;
  field.position.y = y;
  field.position.z = z;
}
