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

  updateLightPosition() {
      var lightPosition = new THREE.Vector4(0,0,0,1);
      var targetPosition = new THREE.Vector4(1,0,0,1);

      var newLightPosition = this.multiplyMatrixVector(this.matrixWorld, lightPosition);
      var newTargetPosition = this.multiplyMatrixVector(this.matrixWorld, targetPosition);

      this.light.position.set(newLightPosition.x, newLightPosition.y, newLightPosition.z);
      this.light.target.position.set(newTargetPosition.x, newTargetPosition.y, newTargetPosition.z);
      this.light.target.updateMatrixWorld();
  }

  multiplyMatrixVector(matrix, vector){
    var matrixArray = matrix.toArray();
    var vectorArray = vector.toArray();
    var vectorRes = [0,0,0,0];

    for(var i=0; i<4; i++){
      for(var j=0; i<4; i++){
        vectorRes[i]+= matrixArray[i*4+j] * vectorArray[j];
      }
    }

    return new THREE.Vector3(vectorRes[0], vectorRes[1], vectorRes[2]);
  }

  setHeadLight(boolean){
    this.light.visible = boolean;
  }
}
