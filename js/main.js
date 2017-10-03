var camera, cameraOrthographic, scene, renderer;
var isOrthographic = false;

var clock = new THREE.Clock();

var screenConst = 425000;
var orthographicScale = (window.innerWidth * window.innerHeight)/screenConst;

var geometry, material, mesh;

var car;

function render() {
  'use strict';
  if(isOrthographic){
    renderer.render(scene, cameraOrthographic);
  }
  else{

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

  scene.add(new THREE.AxisHelper(10));
  createTable(0, -TABLE_SIZEY/2, 0);
  scene.add(new Car(30, 1, 20, 0, 0, 1));
  createField(0, 0, 0);
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
      keyUpPress = true;
      breakUpPress = false;
      break;
  }
}

function onKeyUp(e){
  'use strict'
  switch (e.keyCode) {
    case 38: //up arrow
      keyUpPress = false;
      breakUpPress = true;
      break;
  }
}

function animate() {
  'use strict';
  //checkMove(car);
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
