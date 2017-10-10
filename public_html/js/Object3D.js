class Object3D extends THREE.Object3D {

    constructor() {
        super();
        this.velocity = 0;
        this.axisHelper = new THREE.AxisHelper(100);
    }

    setAxisOn(){
      this.add(this.axisHelper);
    }

    setAxisOff(){
      this.remove(this.axisHelper);
    }

    update(){
//posicao e direccao tem de estar aqui (aceleracao, velocidade..) tem de estar mais cenas aqui
    }
}
