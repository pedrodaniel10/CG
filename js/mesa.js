var TABLE_SIZEX = 180;
var TABLE_SIZEY = 6;
var TABLE_SIZEZ = 80;

function addTableLeg(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(6, 30, 6);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(TABLE_SIZEX, TABLE_SIZEY, TABLE_SIZEZ);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function createTable(x, y, z) {
  'use strict';
  var table = new THREE.Object3D();
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

  addTableTop(table, 0, 0, 0);
  addTableLeg(table, -87, -12, -37);
  addTableLeg(table, -87, -12, 37);
  addTableLeg(table, 87, -12, 37);
  addTableLeg(table, 87, -12, -37);

  scene.add(table);
  table.position.x = x;
  table.position.y = y;
  table.position.z = z;
}
