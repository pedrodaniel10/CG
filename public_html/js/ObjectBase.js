'use strict';

class ObjectBase extends THREE.Object3D {
    constructor() {
        super();

        // Constants
        this.NUM_ORANGES = 3;
        this.NUM_BUTTER = 5;
        this.OBJ_MARGIN = 0.8;

        this.table = new Table();
        this.car = new Car();

        this.oranges = [];
        for (let i = 0; i < this.NUM_ORANGES; i++) {
            let rand_x = (Math.random() - 1/2) * this.table.SIZEX * this.OBJ_MARGIN;
            let rand_z = (Math.random() - 1/2) * this.table.SIZEZ * this.OBJ_MARGIN;
            let rot_x = Math.random()*2 - 1;
            let rot_z = Math.random()*2 - 1;
            let new_orange = new Orange(rand_x, 0, rand_z);
            new_orange.rotateX(rot_x);
            new_orange.rotateZ(rot_z);
            this.oranges.push(new_orange);
        }

        this.butter = [];
        for (let i = 0; i < this.NUM_BUTTER; i++) {
            let rand_x = (Math.random() - 1/2) * this.table.SIZEX * this.OBJ_MARGIN;
            let rand_z = (Math.random() - 1/2) * this.table.SIZEZ * this.OBJ_MARGIN;
            let rot_y = Math.random()*2 - 1;
            let new_butter = new Butter(rand_x, 0, rand_z);
            new_butter.rotateY(rot_y);
            this.butter.push(new_butter);
        }

        this.field = new Field(this.table.SIZEX, this.table.SIZEY, this.table.SIZEZ);

        this.add(this.table);
        this.add(this.car);

        for (let i = 0; i < this.NUM_ORANGES; i++) {
            this.add(this.oranges[i]);
        }

        for (let i = 0; i < this.NUM_BUTTER; i++) {
            this.add(this.butter[i]);
        }

        this.add(this.field);
    }

    //override
    update(){
      this.car.update();
    }
}
