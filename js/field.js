var TORUS_SIZE = 6;
var TORUS_RADIUS = 2;
var TORUS_OUTSIDE_MARGIN = 10;
var TORUS_INSIDE_MARGIN = 130;
var TORUS_X_N = 30;
var TORUS_Z_N = 15;

function addFieldTorus(obj, x, y, z) {
  'use strict';
  geometry = new THREE.TorusGeometry(TORUS_SIZE, TORUS_RADIUS, 16, 32);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y + TORUS_RADIUS, z);
  mesh.rotation.x = Math.PI / 2;
  obj.add(mesh);
}
/*
function addFieldTorusStack(obj, x, y, z) {
    'use strict';
    let nTorus = Math.floor(3 + 3*Math.random());
    for (let i = 0; i < nTorus; i++) {
        addFieldTorus(obj, x, y + i*TORUS_RADIUS, z);
    }
}
*/
function createField(x, y, z) {
  'use strict';
  var field = new THREE.Object3D();
  material = new THREE.MeshBasicMaterial({ color: 0xe68200, wireframe: true });

  let k = TORUS_OUTSIDE_MARGIN + TORUS_SIZE;
  let fieldLength = TABLE_SIZEX - 2*k;
  let fieldWidth = TABLE_SIZEZ - 2*k;

  let n = 30;
  for (let x = -fieldLength / 2; x <= fieldLength / 2; x += fieldLength / n) {
      addFieldTorus(field, x, 0, fieldWidth / 2);
      addFieldTorus(field, x, 0, -fieldWidth / 2);
  }

  n = 15;
  for (let z = -fieldWidth / 2; z <= fieldWidth / 2; z += fieldWidth / n) {
      addFieldTorus(field, fieldLength / 2, 0, z);
      addFieldTorus(field, -fieldLength / 2, 0, z);
  }

  k = TORUS_INSIDE_MARGIN + TORUS_SIZE;
  fieldLength = TABLE_SIZEX - 2*k;
  fieldWidth = TABLE_SIZEZ - 2*k;

  n = 20;
  for (let x = -fieldLength / 2; x <= fieldLength / 2; x += fieldLength / n) {
      addFieldTorus(field, x, 0, fieldWidth / 2);
      addFieldTorus(field, x, 0, -fieldWidth / 2);
  }

  n = 5;
  for (let z = -fieldWidth / 2; z <= fieldWidth / 2; z += fieldWidth / n) {
      addFieldTorus(field, fieldLength / 2, 0, z);
      addFieldTorus(field, -fieldLength / 2, 0, z);
  }

  scene.add(field);
  field.position.x = x;
  field.position.y = y;
  field.position.z = z;
}
