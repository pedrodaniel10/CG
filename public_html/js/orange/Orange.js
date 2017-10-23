'use strict';

var ORANGE_RADIUS = 25;
var LEAF_Y = ORANGE_RADIUS + 1

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

    setRandomVelocity(){
      this.velocity += Math.random() * this.velocityInitialConstant;
    }

    move(delta) {

        if ((this.secondsElapsed > this.secondsToIncrement) && !this.outOfBoard) {
            this.velocity += this.velocityIncrement*Math.random();
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

            this.rollOver(deslocationVec,deslocation);

            this.lastPosition.x = this.position.x;
            this.lastPosition.y = this.position.y;
            this.lastPosition.z = this.position.z;

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
            this.position.set(0,999,0);
            this.outOfBoard = true;
            this.secondsElapsed = 0;
        }
        else if(solidObject instanceof Orange && !this.outOfBoard){
          this.position.x = this.lastPosition.x;
          this.position.y = this.lastPosition.y;
          this.position.z = this.lastPosition.z;

          var vectorAxisOrthogonal = new THREE.Vector3(this.position.x - solidObject.position.x, 0, this.position.z - solidObject.position.z);
          vectorAxisOrthogonal.normalize();

          var vectorAxis = new THREE.Vector3(-vectorAxisOrthogonal.z, 0, vectorAxisOrthogonal.x);
          vectorAxis.normalize();

          /*console.log("Vetor1: x:" + this.direction.x + "z: " + this.direction.z +
          "\nVetor2: " + " x:"+ solidObject.direction.x + "z: " + solidObject.direction.z +
           "\nOrthogonal: " + vectorAxisOrthogonal.x + "z: " + vectorAxisOrthogonal.z +
           "\nAxis: " + vectorAxis.x + "z: " + vectorAxis.z );
           */
          this.direction = this.getDOF().applyAxisAngle(vectorAxis, Math.PI);
          solidObject.direction = solidObject.getDOF().applyAxisAngle(vectorAxis, Math.PI);
          /*console.log("Vetor1: x:" + this.direction.x + "z: " + this.direction.z +
          "\nVetor2: " + " x:"+ solidObject.direction.x + "z: " + solidObject.direction.z +
           "\nOrthogonal: " + vectorAxisOrthogonal.x + "z: " + vectorAxisOrthogonal.z +
           "\nAxis: " + vectorAxis.x + "z: " + vectorAxis.z );
           */
        }
    }
}
