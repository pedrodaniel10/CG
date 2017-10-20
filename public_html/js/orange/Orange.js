'use strict';

var ORANGE_RADIUS = 30;

class Orange extends Object3D {
    constructor(x, y, z) {
        super(x, y, z);
        this.orangeBody = new OrangeBody(0, 0, 0);
        this.orangeLeaf = new OrangeLeaf(5, 34, 5);
        this.boundingVolume = new BoundingSphere(x, y, z, ORANGE_RADIUS);

        this.add(this.orangeBody);
        this.add(this.orangeLeaf);

        //random ATRIBUTES
        this.setRandomPosition();
        this.setRandomDirection();

        //variables
        this.tickCounter = 0;
        this.outOfBoard = false;

        //constants
        this.velocityIncrement = 10;
        this.tickNumber = 20;
        this.ticksRespawn = 150;
    }

    setRandomDirection(){
      var newDirection = new THREE.Vector3(Math.random()*2 - 1, 0, Math.random()*2 - 1);
      newDirection.normalize();
      this.direction = newDirection;
    }

    setRandomPosition(){
      let rand_x = (Math.random() - 1/2) * TABLE_SIZEX * OBJ_MARGIN;
      let rand_z = (Math.random() - 1/2) * TABLE_SIZEZ * OBJ_MARGIN;
      this.position.set(rand_x, ORANGE_RADIUS, rand_z)
    }

    inTable(){
      /*Returns true if the object is within the limits of the table */
      var limitX = TABLE_SIZEX / 2;
      var limitZ = TABLE_SIZEZ / 2;

      return -limitX < this.position.x && this.position.x < limitX &&
             -limitZ < this.position.z && this.position.z < limitZ;
    }

    move(delta) {
      /* after tickNumber calls to update the velocity of this object
       * is incremented by velocityIncrement
       */
       var inTable = this.inTable();

       if(!inTable && !this.outOfBoard){
        this.position.set(999,999,999);

         this.velocity = 0;
         this.tickCounter = 0;
         this.outOfBoard = true;


       }
       else if(this.tickCounter === 0 && !this.outOfBoard) {
         this.velocity+= this.velocityIncrement;
       }
       else if(this.tickCounter === 0 && this.outOfBoard) {
         this.velocity+= this.velocityIncrement;
         this.setRandomPosition();
         this.setRandomDirection();
         this.outOfBoard = false;
       }

       if(inTable) {
        this.tickCounter = (this.tickCounter + 1) % this.tickNumber;

        var deslocation = this.velocity * delta;

        var deslocationVec = this.direction.clone();
        deslocationVec.setLength(deslocation);

        this.position.x += deslocationVec.x;
        this.position.y += deslocationVec.y;
        this.position.z += deslocationVec.z;
      }
      else {
        this.tickCounter = (this.tickCounter + 1) % this.ticksRespawn;
      }

    }

    update(delta){
      this.move(delta);
    }
}
