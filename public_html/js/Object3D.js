var X_AXIS_WORLD = new THREE.Vector3(1,0,0);
var Y_AXIS_WORLD = new THREE.Vector3(0,1,0);
var Z_AXIS_WORLD = new THREE.Vector3(0,0,1);

class Object3D extends THREE.Object3D {

    constructor() {
        super();
        this.velocity = 0;
        this.maximumSpeed = 0;
        this.minimumSpeed = 0;
        this.forwardAcceleration = 0;
        this.backwardAcceleration = 0;
        this.breakingFoward = 0;
        this.breakingBackward = 0;

        //list of meshes on object, facilitates switching shading
        this.meshList = [];

        this.direction = new THREE.Vector3(1,0,0);

        this.axisHelper = new THREE.AxisHelper(100);
    }

    addMeshesFromList() {
        for (let i = 0; i < this.meshList.length; i++) {
            this.add(this.meshList[i]);
        }
    }

    rotateAroundWorldAxis(axis, radians) {
        var rotWorldMatrix = new THREE.Matrix4();
        rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
        rotWorldMatrix.multiply(this.matrix);        // pre-multiply
        this.matrix = rotWorldMatrix;
        this.rotation.setFromRotationMatrix(this.matrix);
    }

    setAxisOn() {
      baseObject.add(this.axisHelper);
    }

    setAxisOff() {
      baseObject.remove(this.axisHelper);
    }

    getDOF() {
    }

    accelerate() {
    }

    update(delta) {
    }

    switchShading() {
      if (gouraudOn) {
          for (let i = 0; i < this.meshList.length; i++) {
              this.meshList[i].toPhong();
          }
      }
      else {
          for (let i = 0; i < this.meshList.length; i++) {
              this.meshList[i].toGouraud();
          }
      }
    }

}
