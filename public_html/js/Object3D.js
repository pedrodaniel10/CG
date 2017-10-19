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

        this.direction = new THREE.Vector3(1,0,0);

        this.axisHelper = new THREE.AxisHelper(100);
    }

    setAxisOn() {
      this.add(this.axisHelper);
    }

    setAxisOff() {
      this.remove(this.axisHelper);
    }

    getDOF() {
    }

    accelerate() {
    }

    update(delta) {
    }

}
