'use strict';
class HeadLight extends Object3D {
  constructor(x, y, z) {
      super();

      /*SpotLight( color, intensity, distance, angle, penumbra, decay )*/
      this.light = new THREE.SpotLight( 0xffffff, 2, 300, 0.8, 0.2, 2);
      this.light.castShadow = true;

      this.add(this.light);
      this.add(this.light.target);

      this.position.set(x, y, z);
      this.updateLightPosition();
  }

  updateLightPosition(){
    this.light.position.set(0, 0, 0);
    this.light.target.position.set(1, 0, 0);
    this.light.target.updateMatrixWorld();
  }

  setHeadLight(boolean){
    this.light.visible = boolean;
  }
}
