'use strict';

var lights = [];

var sunLight = new THREE.DirectionalLight( 0xffffff, 0.5);
sunLight.position.set( 2, 5, 6 );
lights.push(sunLight);

//Create a sphere that cast shadows (but does not receive them)
var sphereGeometry = new THREE.SphereBufferGeometry( 50, 32, 32 );
var sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
sphereMaterial.needsUpdate = true;
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
sphere.position.set(0, 100, 0);



function setSunLight() {
    sunLight.visible = !sunLight.visible;
}

function setLightCalculations() {
    for (let i = 0; i < lights.length; i++) {
        lights[i].visible = !lights[i].visible;
    }
}
