function addWheel(obj, x, y, z, r) {
  'use strict';
  geometry = new THREE.TorusGeometry(1, 1, 16, 32);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.rotation.y = r * Math.PI / 2;
  obj.add(mesh);
}

function addCarBack(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(11, 9, 10);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addCarFront(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(10, 4, 10);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addCarTop(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(9, 1, 4);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function createCar(x, y, z) {
  'use strict';
  var car = new THREE.Object3D();
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

  addCarBack(car, 5.5, 4.5, 5);
  addCarFront(car, 16, 2, 5);
  addCarTop(car, 15.5, 4.5, 5);
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
