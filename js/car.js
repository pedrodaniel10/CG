var keyUpPress=false, breakUpPress=true;

function addWheel(obj, x, y, z, r) {
  'use strict';
  geometry = new THREE.TorusGeometry(1, 1, 16, 32);
  material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true});
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.rotation.y = r * Math.PI / 2;
  obj.add(mesh);
}

function addCarBack(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(11, 9, 10);
  material = new THREE.MeshBasicMaterial({ color: 0xff2b2b, wireframe: true});
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addCarFront(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(10, 4, 10);
  material = new THREE.MeshBasicMaterial({ color: 0xfcfcfc, wireframe: true});
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addCarTop(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(9, 1, 4);
  material = new THREE.MeshBasicMaterial({ color: 0xff2b2b, wireframe: true});
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function createCar(x, y, z, dx, dy, dz) {
  'use strict';
  var car = new THREE.Object3D();
  car.DOF = new THREE.Vector3(dx,dy,dz);
  car.DOF.normalize();
  car.velocity = new THREE.Vector3();

  addCarBack(car, 5.5, 4.5, 5);
  addCarFront(car, 16, 2, 5);
  addCarTop(car, 15.5, 4.5, 5);
  addWheel(car, 5, 0, -1, 0);
  addWheel(car, 5, 0, 11, 0);
  addWheel(car, 16, 0, -1, 0);
  addWheel(car, 16, 0, 11, 0);
  addWheel(car, -1, 5, 5, 1);

  car.lookAt(car.DOF);

  scene.add(car);
  car.position.x = x - 10.5;
  car.position.y = y + 3;
  car.position.z = z - 5;

  return car;
}

function newPosition(car){
  car.position.x += car.velocity.getComponent(0);
  car.position.y += car.velocity.getComponent(1);
  car.position.z += car.velocity.getComponent(2);
}

function moveStraight(car,aceleration, maximumSpeed, deltaTime){
  //null velocity, put direction of DOF
  if(car.velocity.getComponent(0) == 0 &&
     car.velocity.getComponent(1) == 0 &&
     car.velocity.getComponent(2) == 0){
       if (aceleration > 0){
        car.velocity.set(car.DOF.getComponent(0),car.DOF.getComponent(1),car.DOF.getComponent(2))
        car.velocity.setLength(aceleration * deltaTime);
        newPosition(car);
      }
  }
  else {
    var newVelocity = car.velocity.length() + aceleration * deltaTime;
    car.velocity.setLength(Math.min(maximumSpeed, newVelocity));
    newPosition(car);
  }
}

function checkMove(car){
  //Time key pressed
  var delta = clock.getDelta();

  if(keyUpPress){
    moveStraight(car, 1 ,1, delta);
  }
  else if(breakUpPress){
    moveStraight(car, -1, 1, delta);
  }
}
