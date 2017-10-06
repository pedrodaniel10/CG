'use strict';

class ObjectBase extends THREE.Object3D {
    constructor() {
        super();
        this.table = new Table();
        this.car = new Car();

        this.orange1 = new Orange(130, 0, 100);
        this.orange2 = new Orange(-300, 0, 30);
        this.orange2.rotateZ(0.35);
        this.orange3 = new Orange(418, 0, -130);
        this.orange3.rotateX(0.5);

        this.butter1 = new Butter(330, 0, 30);
        this.butter1.rotateY(0);
        this.butter2 = new Butter(230, 0, -80);
        this.butter2.rotateY(1);
        this.butter3 = new Butter(-140, 0, 160);
        this.butter3.rotateY(-0.3);
        this.butter4 = new Butter(20, 0, -160);
        this.butter4.rotateY(0.1);
        this.butter5 = new Butter(-300, 0, -80);
        this.butter5.rotateY(-0.6);

        this.field = new Field(this.table.SIZEX, this.table.SIZEY, this.table.SIZEZ);

        scene.add(this.table);
        scene.add(this.car);
        scene.add(this.orange1);
        scene.add(this.orange2);
        scene.add(this.orange3);
        scene.add(this.butter1);
        scene.add(this.butter2);
        scene.add(this.butter3);
        scene.add(this.butter4);
        scene.add(this.butter5);
        scene.add(this.field);
    }

    //override
    update(){
      this.car.update();
    }
}
