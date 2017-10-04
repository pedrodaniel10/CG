var camera, cameraOrthographic, scene, renderer;
var isOrthographic = false;

var clock = new THREE.Clock();

var screenConst = 450000;
var orthographicScale = (window.innerWidth * window.innerHeight)/screenConst;

var geometry, material, mesh;

var car;
var orange1, orange2, orange3;
var butter1, butter2, butter3, butter4, butter5;
var field;

var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

function render() {
  'use strict';
  if(isOrthographic){
    renderer.render(scene, cameraOrthographic);
  }
  else {
    renderer.render(scene, camera);
  }
}

function createCamera() {
  'use strict';
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

  camera.position.x = 280;
  camera.position.y = 250;
  camera.position.z = 500;
  camera.lookAt(scene.position);

  cameraOrthographic = new THREE.OrthographicCamera( window.innerWidth / -orthographicScale,
                                                     window.innerWidth / orthographicScale,
                                                     window.innerHeight / orthographicScale,
                                                     window.innerHeight / -orthographicScale, 1, 450);
  cameraOrthographic.position.x = 0;
  cameraOrthographic.position.y = 250;
  cameraOrthographic.position.z = 0;
  cameraOrthographic.lookAt(scene.position);
}


function createScene() {
  'use strict';
  scene = new THREE.Scene();

  createTable(0, -TABLE_SIZEY/2, 0);

  car = new Car();

  orange1 = new Orange(130, 0, 100);
  orange2 = new Orange(-300, 0, 30);
  orange2.rotateZ(0.35);
  orange3 = new Orange(418, 0, -130);
  orange3.rotateX(0.5);

  butter1 = new Butter(330, 0, 30);
  butter1.rotateY(0);
  butter2 = new Butter(230, 0, -80);
  butter2.rotateY(1);
  butter3 = new Butter(-140, 0, 160);
  butter3.rotateY(-0.3);
  butter4 = new Butter(20, 0, -160);
  butter4.rotateY(0.1);
  butter5 = new Butter(-300, 0, -80);
  butter5.rotateY(-0.6);

  field = new Field();

  scene.add(car);
  scene.add(orange1);
  scene.add(orange2);
  scene.add(orange3);
  scene.add(butter1);
  scene.add(butter2);
  scene.add(butter3);
  scene.add(butter4);
  scene.add(butter5);
  scene.add(field);
  scene.add(new THREE.AxisHelper(100));
}

function onResize() {
  'use strict';
  orthographicScale = (window.innerWidth * window.innerHeight)/screenConst;
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (window.innerHeight > 0 && window.innerWidth > 0) {
    camera.aspect = renderer.getSize().width / renderer.getSize().height;
    camera.updateProjectionMatrix();
    cameraOrthographic.left = renderer.getSize().width / -orthographicScale;
    cameraOrthographic.right = renderer.getSize().width / orthographicScale;
    cameraOrthographic.top = renderer.getSize().height / orthographicScale;
    cameraOrthographic.bottom = renderer.getSize().height / -orthographicScale;
    cameraOrthographic.updateProjectionMatrix();
  }
}


function onKeyDown(e) {
  'use strict'
  switch (e.keyCode) {

    case 65: //A
    case 97: //a
      scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.material.wireframe = !node.material.wireframe;
        }
      });
      break;

    case 83: //S
    case 115: //s
      isOrthographic = !isOrthographic;
      break;

    case 38: //up arrow
      car.up = true;
      car.upB = false;
      break;

    case 40: //down arrow
      car.down = true;
      car.downB = false;
      break;
  }
}

function onKeyUp(e){
  'use strict'
  switch (e.keyCode) {
    case 38: //up arrow
      car.up = false;
      car.upB = true;
      break;

  case 40: //down arrow
    car.down = false;
    car.downB = true;
    break;
}
}

function animate() {
  'use strict';
  car.checkMove();
  render();
  requestAnimationFrame(animate);
}

function init() {
  'use strict';
  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createScene();
  createCamera();
  render();

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown)
  window.addEventListener("keyup", onKeyUp)
}
