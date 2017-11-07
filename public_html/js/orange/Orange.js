'use strict';

var ORANGE_RADIUS = 25;
var LEAF_Y = ORANGE_RADIUS + 1

class Orange extends SolidObject {
    constructor(x, y, z) {
        super(x, y, z);
        this.orangeBody = new OrangeBody(0, 0, 0);
        this.orangeLeaf = new OrangeLeaf(5, LEAF_Y, 5);
        this.boundingVolume = new BoundingSphere(0, 0, ORANGE_RADIUS);

        this.meshList.push(this.orangeBody);
        this.meshList.push(this.orangeLeaf);

        this.addMeshesFromList();
        this.add(this.boundingVolume);

        //random ATRIBUTES
        this.setRandomPosition();
        this.setRandomDirection();
        this.setRandomVelocity();

        //variables
        this.secondsElapsed = this.secondsRespawn;
        this.outOfBoard = false;
        this.lastPosition = this.position;

        //constants
        this.velocityInitialConstant = 50;
        this.velocityIncrement = 5;
        this.secondsToIncrement = 2;
        this.secondsRespawn = 2;
    }

    getDOF() {
        var z_axis = this.getWorldDirection();
        return new THREE.Vector3(z_axis.getComponent(2), 0, -z_axis.getComponent(0));
    }

    setRandomDirection() {
        var newDirection = new THREE.Vector3(Math.random()*2 - 1, 0, Math.random()*2 - 1);
        newDirection.normalize();
        this.direction = newDirection;
    }

    setRandomPosition() {
        let rand_x = (Math.random() - 1/2) * TABLE_SIZEX * OBJ_MARGIN;
        let rand_z = (Math.random() - 1/2) * TABLE_SIZEZ * OBJ_MARGIN;
        this.position.set(rand_x, ORANGE_RADIUS, rand_z);
    }

    setRandomVelocity() {
      if (this.velocity < 150) {
        this.velocity += Math.random() * this.velocityInitialConstant;
      }
    }

    move(delta) {
        if ((this.secondsElapsed > this.secondsToIncrement) && !this.outOfBoard) {
          if (this.velocity < 150) {
            this.velocity += this.velocityIncrement*Math.random();
          }
            this.secondsElapsed = 0;
        }
        else if (this.outOfBoard && (this.secondsElapsed > this.secondsRespawn)) {
            this.setRandomVelocity();
            this.setRandomPosition();
            this.setRandomDirection();
            this.outOfBoard = false;
            this.secondsElapsed = 0;
        }

        if (!this.outOfBoard) {
            this.secondsElapsed += delta;

            var deslocation = this.velocity * delta;

            var deslocationVec = this.direction.clone();
            deslocationVec.setLength(deslocation);

            this.rollOver(deslocationVec, deslocation);

            this.position.x += deslocationVec.x;
            this.position.z += deslocationVec.z;
        }
        else {
            this.secondsElapsed += delta;
        }
    }

    rollOver(deslocationVec, distance){
        var angleToXaxis = X_AXIS_WORLD.angleTo(deslocationVec);
        var totalRotation = distance / ORANGE_RADIUS;
        if(deslocationVec.z > 0){ //quadrantes positivos => angulos positivos
            this.rotateAroundWorldAxis(Y_AXIS_WORLD, angleToXaxis);
            this.rotateAroundWorldAxis(Z_AXIS_WORLD, -totalRotation);
            this.rotateAroundWorldAxis(Y_AXIS_WORLD, -angleToXaxis);
        }
        else if (deslocationVec.z <= 0){ //quadrantes negativos => angulos negativos
          this.rotateAroundWorldAxis(Y_AXIS_WORLD, -angleToXaxis);
          this.rotateAroundWorldAxis(Z_AXIS_WORLD, -totalRotation);
          this.rotateAroundWorldAxis(Y_AXIS_WORLD, angleToXaxis);
        }

      }

    //override
    update(delta) {
        this.move(delta);
    }

    //override
    collided(solidObject, delta) {
        if (solidObject instanceof FieldLimit && !this.outOfBoard) {
            this.position.set(999,999,999);
            this.outOfBoard = true;
            this.secondsElapsed = 0;
        }
    }
}
