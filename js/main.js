var camera, cameraOrthographic, scene, renderer;
var isOrthographic = false;

var geometry, material, mesh;

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

  camera.position.x = 125;
  camera.position.y = 75;
  camera.position.z = 100;
  camera.lookAt(scene.position);

  cameraOrthographic = new THREE.OrthographicCamera( window.innerWidth / - 16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / - 16, 1, 50);
  cameraOrthographic.position.x = 0;
  cameraOrthographic.position.y = 50;
  cameraOrthographic.position.z = 0;
  cameraOrthographic.lookAt(scene.position);
}


function createScene() {
  'use strict';
  scene = new THREE.Scene();

  scene.add(new THREE.AxisHelper(10));
  createTable(0, 0, 0);
}

function onResize() {
  'use strict';
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (window.innerHeight > 0 && window.innerWidth > 0) {
    camera.aspect = renderer.getSize().width / renderer.getSize().height;
    camera.updateProjectionMatrix();
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
  }
}

function animate() {
  'use strict';

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
}
