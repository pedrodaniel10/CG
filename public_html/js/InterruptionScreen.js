'use strict';
var PAUSE = 0, RESTART = 1

class InterruptionScreen extends Object3D {
  constructor(x, y, z, texture) {
    super(x, y, z);

    if(texture == PAUSE){
      this.texturePath = "textures/pause.png";
    }
    else if (texture == RESTART) {
      this.texturePath = "textures/gameover.png";
    }
    else{
      //should not happen
    }

    this.type = texture;

    this.texture = new THREE.TextureLoader().load(this.texturePath);

    this.geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    this.material = new THREE.MeshBasicMaterial({ color: 0xc4f6ff,  map: this.texture, wireframe: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.position.set(x, y, z);
    this.rotateX(-Math.PI/2);
    this.visible = false;

    this.add(this.mesh);
  }

  setScreen() {
      if (this.type == PAUSE) {
          pauseOn = !pauseOn;
          if (pauseOn) {
              cameraIndex = 0;
              pauseScreen.visible = true;
          }
          else {
              cameraIndex = lastCameraIndex;
              pauseScreen.visible = false;
              nClicked = lClicked = cClicked = gClicked = hClicked = sClicked = false;
          }
      }
      else if (this.type == RESTART) {
          restartOn = !restartOn;
          if (restartOn) {
              cameraIndex = 0;
              restartScreen.visible = true;
          }
          else {
              cameraIndex = lastCameraIndex;
              restartScreen.visible = false;
              nClicked = lClicked = cClicked = gClicked = hClicked = sClicked = false;
          }
      }
      else {
          //should not happen
      }
  }

}
