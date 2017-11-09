'use strict';
class HeadLight extends Object3D {
  constructor(x, y, z) {
      super();

      this.light = new THREE.SpotLight( 0xffffff, 1, 300, 0.9, 0.2, 2);
      this.light.castShadow = true;

      this.add(this.light);
      this.add(this.light.target);

      this.position.set(x, y, z);
      this.updateLightPosition();
  }

  updateLightPosition(){
    var lightPosition = new THREE.Vector3(0,0,0);
    var targetPosition = new THREE.Vector3(1,0,0);

    this.localToWorld(lightPosition);
    this.localToWorld(targetPosition);

    this.light.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
    this.light.target.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
    this.light.target.updateMatrixWorld();
  }

  setHeadLight(boolean){
    this.light.visible = boolean;
  }
}
