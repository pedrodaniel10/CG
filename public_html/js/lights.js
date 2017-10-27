'use strict';

var lights = [];

var sunLight = new THREE.DirectionalLight( 0xfff8e8, 0.9);
sunLight.position.set( 2, 9, 5 );
lights.push(sunLight);

var candleLight = new THREE.PointLight(0xffffff, 1, 500, 1);
candleLight.position.set(0, 40, 0);
candleLight.castShadow = true;
lights.push(candleLight);

var helper = new THREE.CameraHelper( candleLight.shadow.camera );


function setSunLight() {
    if (lightsOn) {
        sunLight.visible = !sunLight.visible;
    }
}

function setLightCalculations() {
    if (lightsOn) {
        for (let i = 0; i < lights.length; i++) {
            lights[i].visible = false;
        }
    }
    else {
      for (let i = 0; i < lights.length; i++) {
          lights[i].visible = true;
      }
    }
    lightsOn = !lightsOn;
}
