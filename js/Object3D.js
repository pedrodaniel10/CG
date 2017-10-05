class Object3D extends THREE.Object3D {
    constructor() {
        super();
        this.axisHelper = new THREE.AxisHelper(100);
    }

    setAxisOn(){
      this.add(this.axisHelper);
    }

    setAxisOff(){
      this.remove(this.axisHelper);
    }

    update(){

    }
}
