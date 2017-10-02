function addWheel(obj, x, y, z, r) {
  'use strict';
  geometry = new THREE.TorusGeometry(1, 1, 16, 32);
  material = new THREE.MeshBasicMaterial({ color: 0x000000});
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.rotation.y = r * Math.PI / 2;
  obj.add(mesh);
}

function addCarBack(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(11, 9, 10);
  material = new THREE.MeshBasicMaterial({ color: 0xff2b2b});
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addCarFront(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(10, 4, 10);
  material = new THREE.MeshBasicMaterial({ color: 0xfcfcfc});
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addCarTop(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(8, 1, 4);
  material = new THREE.MeshBasicMaterial({ color: 0xff2b2b});
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function createCar(x, y, z) {
  'use strict';
  var car = new THREE.Object3D();

  addCarBack(car, 5.5, 4.5, 5);
  addCarFront(car, 16, 2, 5);
  addCarTop(car, 15, 4.5, 5);
  addWheel(car, 5, 0, -1, 0);
  addWheel(car, 5, 0, 11, 0);
  addWheel(car, 16, 0, -1, 0);
  addWheel(car, 16, 0, 11, 0);
  addWheel(car, -1, 5, 5, 1);

  scene.add(car);
  car.position.x = x;
  car.position.y = y;
  car.position.z = z;
}
