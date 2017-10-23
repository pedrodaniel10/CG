var scene, renderer, baseObject;
var cameras = [], cameraIndex=0;

var aClicked = false;
var wireframOn = true;

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
  var cameraFar = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

  cameraFar.position.x = 280;
  cameraFar.position.y = 250;
  cameraFar.position.z = 500;
  cameraFar.lookAt(scene.position);

  var cameraOrthographic = new THREE.OrthographicCamera( window.innerWidth / -orthographicScale,
                                                     window.innerWidth / orthographicScale,
                                                     window.innerHeight / orthographicScale,
                                                     window.innerHeight / -orthographicScale, 1, 450);
  cameraOrthographic.position.set(0,250,0)
  cameraOrthographic.lookAt(scene.position);

  cameras.push(cameraOrthographic);
  cameras.push(cameraFar);
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

    cameras[0].left = renderer.getSize().width / -orthographicScale;
    cameras[0].right = renderer.getSize().width / orthographicScale;
    cameras[0].top = renderer.getSize().height / orthographicScale;
    cameras[0].bottom = renderer.getSize().height / -orthographicScale;
    cameras[0].updateProjectionMatrix();

    cameras[1].aspect = renderer.getSize().width / renderer.getSize().height;
    cameras[1].updateProjectionMatrix();

    cameras[2].aspect = renderer.getSize().width / renderer.getSize().height;
    cameras[2].updateProjectionMatrix();
  }
}

function carLost() {
  for (let i = 1; i < NUM_ORANGES+1; i++) {
      baseObject.objects[i].position.set(0,999,0);
      baseObject.objects[i].secondsElapsed = baseObject.objects[i].secondsRespawn;
      baseObject.objects[i].outOfBoard = true;
      baseObject.objects[i].velocity = Math.random() * 50;
  }
}

function removeObj(object) {
    scene.remove(object);
}


function onKeyDown(e) {
  'use strict'
  switch (e.keyCode) {

    case 65: //A
    case 97: //a
      aClicked = !aClicked;
      break;

    case 49: //1
      cameraIndex = 0;
      break;
    case 50: //2
      cameraIndex = 1;
      break;
    case 51: //3
      cameraIndex = 2;
      break;
  }
}

function onKeyUp(e) {
  'use strict'
  switch (e.keyCode) {

  }
}

function update() {
  if(aClicked) {
    wireframOn = !wireframOn;
    scene.traverse(function (node) {
      if (node instanceof THREE.Mesh) {
        node.material.wireframe = wireframOn;
      }
    });
    aClicked = false;
  }
  baseObject.update();
}

function animate() {
  'use strict';
  update();
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

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown)
  window.addEventListener("keyup", onKeyUp)
}
