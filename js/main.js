var scene, renderer, baseObject;
var cameras = [], cameraIndex=0;

var clock = new THREE.Clock();

var screenConst = 450000;
var orthographicScale = (window.innerWidth * window.innerHeight)/screenConst;

var geometry, material, mesh;

var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

function render() {
  'use strict';
    renderer.render(scene, cameras[cameraIndex]);
}

function createCamera() {
  'use strict';
  var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

  camera.position.x = 280;
  camera.position.y = 250;
  camera.position.z = 500;
  camera.lookAt(scene.position);

  var cameraOrthographic = new THREE.OrthographicCamera( window.innerWidth / -orthographicScale,
                                                     window.innerWidth / orthographicScale,
                                                     window.innerHeight / orthographicScale,
                                                     window.innerHeight / -orthographicScale, 1, 450);
  cameraOrthographic.position.x = 0;
  cameraOrthographic.position.y = 250;
  cameraOrthographic.position.z = 0;
  cameraOrthographic.lookAt(scene.position);

  cameras.push(camera);
  cameras.push(cameraOrthographic);
  cameras.push(baseObject.car.camera);
}


function createScene() {
  'use strict';
  scene = new THREE.Scene();
  baseObject = new ObjectBase();
  scene.add(baseObject);
  //scene.add(new THREE.AxisHelper(100));
}

function onResize() {
  'use strict';
  orthographicScale = (window.innerWidth * window.innerHeight)/screenConst;
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (window.innerHeight > 0 && window.innerWidth > 0) {
    cameras[0].aspect = renderer.getSize().width / renderer.getSize().height;
    cameras[0].updateProjectionMatrix();
    cameras[1].left = renderer.getSize().width / -orthographicScale;
    cameras[1].right = renderer.getSize().width / orthographicScale;
    cameras[1].top = renderer.getSize().height / orthographicScale;
    cameras[1].bottom = renderer.getSize().height / -orthographicScale;
    cameras[1].updateProjectionMatrix();
    cameras[2].aspect = renderer.getSize().width / renderer.getSize().height;
    cameras[2].updateProjectionMatrix();
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
      cameraIndex = (cameraIndex + 1) % cameras.length;
      break;
  }
}

function onKeyUp(e){
  'use strict'
  switch (e.keyCode) {

  }
}

function update(){
  car.checkMove();
}

function animate() {
  'use strict';
  baseObject.update();
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
