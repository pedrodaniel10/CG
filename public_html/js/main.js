var scene, sceneLifes, renderer, rendererLifes, baseObject, lightBase, lifes;
var cameras = [], cameraIndex=0;
var lastCameraIndex = 0;

var aClicked = true;
var wireframOn = true;

var nClicked = false;
var lClicked = false;
var cClicked = false;
var gClicked = false;
var hClicked = false;
var sClicked = false;
var rClicked = false;

var lightsOn = true;
var gouraudOn = true;
var basicOn = false;
var headLightsOn = true;
var pauseOn = false;
var restartOn = false;

var clock = new THREE.Clock();

var screenConst = 450000;
var orthographicScale = (window.innerWidth * window.innerHeight)/screenConst;

var geometry, material, mesh;

var pauseScreen, restartScreen;

var keyState = {};
window.addEventListener('keydown', function(e) {
    keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function(e) {
    keyState[e.keyCode || e.which] = false;
}, true);

function render() {
    'use strict';
    renderer.clear();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, cameras[cameraIndex]);

    renderer.setViewport(lifes.x, lifes.y, lifes.width, lifes.height);
    renderer.render(sceneLifes, lifes.camera);
}

function createCamera() {
    'use strict';
    var cameraFar = new THREE.PerspectiveCamera(50 * window.innerHeight / window.innerWidth,
        window.innerWidth / window.innerHeight, 800, 1800);

        cameraFar.position.set(560, 600, 1200);
        cameraFar.lookAt(scene.position);

    var cameraOrthographic = new THREE.OrthographicCamera( window.innerWidth / -orthographicScale,
        window.innerWidth / orthographicScale,
        window.innerHeight / orthographicScale,
        window.innerHeight / -orthographicScale, 1, 450);
        cameraOrthographic.position.set(0,250,0);
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

    pauseScreen = new InterruptionScreen(0, 248, 0, PAUSE);
    scene.add(pauseScreen);
    restartScreen = new InterruptionScreen(0, 248, 0, RESTART);
    scene.add(restartScreen);

    //lights:
    lightBase = new LightBase();
    scene.add(lightBase);

    //scene.add(new THREE.AxisHelper(100));
}

function createSceneLifes(){
    sceneLifes = new THREE.Scene();
    lifes = new Lifes();

    sceneLifes.add(lifes);
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
        cameras[1].fov = 50 * renderer.getSize().height / renderer.getSize().width;
        cameras[1].updateProjectionMatrix();

        cameras[2].aspect = renderer.getSize().width / renderer.getSize().height;
        cameras[2].updateProjectionMatrix();

        lifes.cameraOnResize(renderer.getSize().width, renderer.getSize().height);
    }
}

function carLost() {
    for (let i = 0; i < baseObject.objects.length; i++) {
        if (baseObject.objects[i] instanceof Orange) {
            baseObject.objects[i].position.set(999,999,999);
            baseObject.objects[i].secondsElapsed = baseObject.objects[i].secondsRespawn;
            baseObject.objects[i].outOfBoard = true;
            baseObject.objects[i].velocity = Math.random() * 50;
        }
    }
    baseObject.car.setInitialPosition();
    baseObject.car.setInitialDirection();
    baseObject.field.placeCheerios();
    lifes.takeLife();
    if(lifes.lifesRemaining == 0){
      restartScreen.setScreen();
      lifes.restart();
    }
}

function removeObj(object) {
    scene.remove(object);
}

function addObj(object) {
    scene.add(object);
}


function onKeyDown(e) {
    'use strict'
    switch (e.keyCode) {

        case 65: //A
        case 97: //a
        aClicked = !aClicked;
        break;
        case 49: //1
        if (!pauseOn) {
          lastCameraIndex = 0;
          cameraIndex = 0;
        }
        break;
        case 50: //2
        if (!pauseOn) {
          lastCameraIndex = 1;
          cameraIndex = 1;
        }
        break;
        case 51: //3
        if (!pauseOn) {
          lastCameraIndex = 2;
          cameraIndex = 2;
        }
        break;
        case 78: //N
        nClicked = !nClicked;
        break;
        case 76: //L
        lClicked = !lClicked;
        break;
        case 67: //C
        cClicked = !cClicked;
        break;
        case 71: //G
        gClicked = !gClicked;
        break;
        case 72:
        hClicked = !hClicked;
        break;
        case 83:
        sClicked = !sClicked;
        break;
        case 82:
        rClicked = !rClicked;
        break;
    }
}

function onKeyUp(e) {
    'use strict'
    switch (e.keyCode) {

    }
}

function update() {

    if (!restartOn) {
        if(!pauseOn){
          if (aClicked) {
              wireframOn = !wireframOn;
              scene.traverse(function (node) {
                  if (node instanceof THREE.Mesh) {
                      node.material.wireframe = wireframOn;
                  }
              });
              aClicked = false;
          }
          if (nClicked) {
              lightBase.setSunLight();
              nClicked = false;
          }
          if (lClicked) {
              basicOn = !basicOn;
              lightBase.setLightCalculations();
              baseObject.switchAllShading();
              lClicked = false;
          }
          if (cClicked && !basicOn) {
              lightBase.setCandleLights();
              cClicked = false;
          }
          if (gClicked && !basicOn) {
              baseObject.switchAllShading();
              gouraudOn = !gouraudOn;
              gClicked = false;
          }
          if (hClicked && !basicOn) {
              headLightsOn = !headLightsOn;
              baseObject.car.setHeadLight(headLightsOn);
              hClicked = false;
          }
        }
        baseObject.update();


        if (sClicked) {
            pauseScreen.setScreen();
            sClicked = false;
        }
    }
    if (rClicked && restartOn) {
        restartScreen.setScreen();
        rClicked = false;
    }
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
    renderer.autoClear = false;

    document.body.appendChild(renderer.domElement);

    createScene();
    createSceneLifes();
    createCamera();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
}
