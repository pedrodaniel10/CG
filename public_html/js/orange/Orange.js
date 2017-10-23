'use strict';

var ORANGE_RADIUS = 25;
var LEAF_Y = ORANGE_RADIUS + 4

class Orange extends SolidObject {
    constructor(x, y, z) {
        super(x, y, z);
        this.orangeBody = new OrangeBody(0, 0, 0);
        this.orangeLeaf = new OrangeLeaf(5, LEAF_Y, 5);
        this.boundingVolume = new BoundingSphere(0, 0, ORANGE_RADIUS);

        this.add(this.orangeBody);
        this.add(this.orangeLeaf);
        this.add(this.boundingVolume);

        //random ATRIBUTES
        this.setRandomPosition();
        this.setRandomDirection();

        //variables
        this.tickCounter = 0;
        this.outOfBoard = false;
        this.rotationAngleX = 0;
        this.rotationAngleZ = 0;

        //constants
        this.velocity = Math.random() * 75
        this.velocityIncrement = 5;
        this.tickNumber = 20;
        this.ticksRespawn = 150;
    }

    setRandomDirection() {
        var newDirection = new THREE.Vector3(Math.random()*2 - 1, 0, Math.random()*2 - 1);
        newDirection.normalize();
        this.direction = newDirection;
    }

    setRandomPosition() {
        let rand_x = (Math.random() - 1/2) * TABLE_SIZEX * OBJ_MARGIN;
        let rand_z = (Math.random() - 1/2) * TABLE_SIZEZ * OBJ_MARGIN;
        this.position.set(rand_x, ORANGE_RADIUS, rand_z)
    }

    move(delta) {
        /* after tickNumber calls to update the velocity of this object
        * is incremented by velocityIncrement
        */
        if (this.tickCounter === 0 && !this.outOfBoard) {
            this.velocity += this.velocityIncrement*Math.random();
        }
        else if (this.tickCounter === 0 && this.outOfBoard) {
            this.velocity += this.velocityIncrement*Math.random();
            this.setRandomPosition();
            this.setRandomDirection();
            this.outOfBoard = false;
        }

        if (!this.outOfBoard) {
            this.tickCounter = (this.tickCounter + 1) % this.tickNumber;

            var deslocation = this.velocity * delta;

            var deslocationVec = this.direction.clone();
            deslocationVec.setLength(deslocation);

            this.rollOver(deslocationVec);
        }
        else {
            this.tickCounter = (this.tickCounter + 1) % this.ticksRespawn;
        }

    }

    rollOver(deslocationVec){
      var distanceX = deslocationVec.x;
      var distanceZ = deslocationVec.z;
      var angleX = distanceX / (2 * Math.PI * ORANGE_RADIUS) * 5*Math.PI;
      var angleZ = distanceZ / (2 * Math.PI * ORANGE_RADIUS) * 5*Math.PI;

      this.rotateAroundWorldAxis(Z_AXIS_WORLD, angleX);
      this.rotateAroundWorldAxis(X_AXIS_WORLD, angleZ);
      this.position.x += distanceX;
      this.position.z += distanceZ;
    }

    //override
    update(delta) {
        this.move(delta);
    }

    //override
    collided(solidObject, delta) {
        if (solidObject instanceof FieldLimit && !this.outOfBoard) {
            this.position.set(999,999,999);
            this.tickCounter = 0;
            this.outOfBoard = true;
        }
        return 0;
    }
}
