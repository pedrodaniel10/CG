'use strict';

var NUM_ORANGES = 3;
var NUM_BUTTER = 5;
var OBJ_MARGIN = 0.8;

class ObjectBase extends THREE.Object3D {
    constructor() {
        super();

        // Constants
        this.NUM_ORANGES = NUM_ORANGES;
        this.NUM_BUTTER = NUM_BUTTER;
        this.OBJ_MARGIN = OBJ_MARGIN;

        this.table = new Table();
        this.car = new Car();

        this.objects = [this.car];

        for (let i = 0; i < this.NUM_ORANGES; i++) {
            let new_orange = new Orange(0, 0, 0);
            this.objects.push(new_orange);
        }

        for (let i = 0; i < this.NUM_BUTTER; i++) {
            let rand_x = (Math.random() - 1/2) * this.table.SIZEX * this.OBJ_MARGIN;
            let rand_z = (Math.random() - 1/2) * this.table.SIZEZ * this.OBJ_MARGIN;
            let rot_y;
            if (Math.random() > 0.5) {
                rot_y = Math.random()*0.4 + 1.4;
            }
            else {
                rot_y = Math.random()*0.4 - 0.2;
            }
            let new_butter = new Butter(rand_x, 0, rand_z, rot_y);
            this.objects.push(new_butter);
        }

        this.field = new Field(this.table.SIZEX, this.table.SIZEY, this.table.SIZEZ);

        this.objects = this.objects.concat(this.field.cheerios);
        this.objects = this.objects.concat(this.field.fieldLimits);

        this.add(this.table);
        this.add(this.car);

        for (let i = 0; i < this.objects.length; i++) {
            this.add(this.objects[i]);
        }
    }

    //override
    update(delta) {
      var delta = clock.getDelta();

      // collisions
      for (let i = 0; i < this.objects.length; i++) {
          for (let j = 0; j < this.objects.length; j++) {
              if (i !== j && this.objects[i].collides(this.objects[j])) {
                  let carLost1 = this.objects[i].collided(this.objects[j], delta);
                  let carLost2 = this.objects[j].collided(this.objects[i], delta);

                  //car fell or touched orange, so oranges reset
                  if (carLost1 === 1 || carLost2 === 1) {
                      for (let i = 1; i < NUM_ORANGES+1; i++) {
                          this.objects[i].position.set(999,999,999);
                          this.objects[i].tickCounter = 0;
                          this.objects[i].outOfBoard = true;
                          this.objects[i].velocity = Math.random() * 75;
                      }
                  }
              }
          }
      }

      // update object positions
      for (let i = 0; i < this.objects.length; i++)
        this.objects[i].update(delta);
    }
}
