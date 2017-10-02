function addTableLeg(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(2, 6, 2);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y - 3, z);
  obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(180, 2, 80);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function createTable(x, y, z) {
  'use strict';
  var table = new THREE.Object3D();
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

  addTableTop(table, 0, 0, 0);
  addTableLeg(table, -25, -1, -8);
  addTableLeg(table, -25, -1, 8);
  addTableLeg(table, 25, -1, 8);
  addTableLeg(table, 25, -1, -8);

  scene.add(table);
  table.position.x = x;
  table.position.y = y;
  table.position.z = z;
}
