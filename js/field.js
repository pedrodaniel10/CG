var TORUS_SIZE = 3;
var TORUS_RADIUS = 1;
var TORUS_OUTSIDE_MARGIN = 20;
var TORUS_INSIDE_MARGIN = 110;
var TORUS_X_N = 30;
var TORUS_Z_N = 15;

function addFieldTorusStack(obj, x, y, z) {
  'use strict';
  geometry = new THREE.TorusGeometry(TORUS_SIZE, TORUS_RADIUS, 16, 32);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y + TORUS_RADIUS, z);
  mesh.rotation.x = Math.PI / 2;
  obj.add(mesh);
}

function addFieldTorus(obj, x, y, z) {
    'use strict';
    addFieldTorusStack(obj, x, y + TORUS_RADIUS, z);
}

function createField(x, y, z) {
  'use strict';
  var field = new THREE.Object3D();
  material = new THREE.MeshBasicMaterial({ color: 0xe68200, wireframe: true });

  let k = TORUS_OUTSIDE_MARGIN + TORUS_SIZE;
  let fieldLength = TABLE_SIZEX - 2*k;
  let fieldWidth = TABLE_SIZEZ - 2*k;

  let n = 40;
  for (let x = -fieldLength / 2; x <= fieldLength / 2; x += fieldLength / n) {
      addFieldTorus(field, x, 0, fieldWidth / 2);
      addFieldTorus(field, x, 0, -fieldWidth / 2);
  }

  n = 18;
  for (let z = -fieldWidth / 2; z <= fieldWidth / 2; z += fieldWidth / n) {
      addFieldTorus(field, fieldLength / 2, 0, z);
      addFieldTorus(field, -fieldLength / 2, 0, z);
  }

  k = TORUS_INSIDE_MARGIN + TORUS_SIZE;
  fieldLength = TABLE_SIZEX - 2*k;
  fieldWidth = TABLE_SIZEZ - 2*k;

  n = 30;
  for (let x = -fieldLength / 2; x <= fieldLength / 2; x += fieldLength / n) {
      addFieldTorus(field, x, 0, fieldWidth / 2);
      addFieldTorus(field, x, 0, -fieldWidth / 2);
  }

  n = 8;
  for (let z = -fieldWidth / 2; z <= fieldWidth / 2; z += fieldWidth / n) {
      addFieldTorus(field, fieldLength / 2, 0, z);
      addFieldTorus(field, -fieldLength / 2, 0, z);
  }

  scene.add(field);
  field.position.x = x;
  field.position.y = y;
  field.position.z = z;
}
