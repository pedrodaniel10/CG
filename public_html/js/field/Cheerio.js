'use strict';

class Cheerio extends SolidObject {
    constructor(x, y, z, size, radius) {
        super();
        this.cheerioBody = new CheerioBody(0, 0, 0, size, radius);
        this.boundingVolume = new BoundingSphere(0, 0, size + radius);

        this.add(this.cheerioBody);
        this.add(this.boundingVolume);
        this.position.set(x, y, z);

        this.velocity = 0;
        this.acceleration = -50;
        this.moveNow = 0;
    }

    getDOF() {
        var z_axis = this.getWorldDirection();
        return new THREE.Vector3(z_axis.getComponent(2), 0, -z_axis.getComponent(0));
    }

    move(delta) {
      var deslocationVec = this.direction.clone();
      var deslocation = 0;

      if (this.velocity > 0) {
          deslocation = this.velocity * delta + this.acceleration*0.5*Math.pow(delta, 2);
          deslocationVec.setLength(deslocation);
          this.velocity = this.velocity + this.acceleration*delta;
      }
      else {
          deslocationVec.setLength(deslocation);
          this.velocity = 0;
      }

      this.lastPosX = this.position.x;
      this.lastPosY = this.position.y;
      this.lastPosZ = this.position.z;

      this.position.x += deslocationVec.x;
      this.position.y += deslocationVec.y;
      this.position.z += deslocationVec.z;
    }

    teleportPos() {
      var deslocationVec = this.direction.clone();
      var deslocation = 1;
      deslocationVec.setLength(deslocation);

      this.lastPosX = this.position.x;
      this.lastPosY = this.position.y;
      this.lastPosZ = this.position.z;

      this.position.x += deslocationVec.x;
      this.position.y += deslocationVec.y;
      this.position.z += deslocationVec.z;
    }

    stop() {
        this.velocity = 0;
    }


    //override
    update(delta) {
        if (this.moveNow === 1) {
            this.move(delta);
        }
        else {
            this.stop();
        }
    }

    //override
    collided(solidObject) {
        if (solidObject instanceof Car) {
            this.lastObject = solidObject;
            this.velocity = solidObject.velocity;
            this.direction = solidObject.getDOF();
            this.moveNow = 1;
            this.teleportPos();
        }
        else if (solidObject instanceof Cheerio) {
          if (this.velocity == 0) {
            this.velocity = solidObject.velocity;
            this.direction = solidObject.getDOF();
            this.moveNow = 1;
          }
          else {
            this.acceleration = this.acceleration - 10;
          }
        }



        else if (solidObject instanceof FieldLimit) {
            scene.remove(this);
        }
    }
}
