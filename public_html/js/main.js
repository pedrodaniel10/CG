var scene, renderer, baseObject;
var cameraOrthographic;

var aClicked = false;

var clock = new THREE.Clock();

var screenConst = 450000;
var orthographicScale = (window.innerWidth * window.innerHeight)/screenConst;

var geometry, material, mesh;

var keyState = {};
window.addEventListener('keydown',function(e) {
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup',function(e) {
    keyState[e.keyCode || e.which] = false;
},true);

function render() {
  'use strict';
    renderer.render(scene, cameraOrthographic);
}

function createCamera() {
  'use strict';

  cameraOrthographic = new THREE.OrthographicCamera( window.innerWidth / -orthographicScale,
                                                     window.innerWidth / orthographicScale,
                                                     window.innerHeight / orthographicScale,
                                                     window.innerHeight / -orthographicScale, 1, 450);
  cameraOrthographic.position.set(0,250,0)
  cameraOrthographic.lookAt(scene.position);
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
      aClicked = !aClicked;
      break;
  }
}

function onKeyUp(e) {
  'use strict'
  switch (e.keyCode) {

  }
}

function update() {
  if (aClicked) {
    scene.traverse(function (node) {
      if (node instanceof THREE.Mesh) {
        node.material.wireframe = !node.material.wireframe;
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
