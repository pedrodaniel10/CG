class Mesh extends THREE.Mesh {
    constructor(x, y, z) {
        super();
        this.position.set(x, y, z);
        this.axisHelper = new THREE.AxisHelper(100);
    }

    setAxisOn() {
      this.add(this.axisHelper);
    }

    setAxisOff() {
      this.remove(this.axisHelper);
    }

    update() {

    }
}
