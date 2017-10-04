'use strict';

class Car extends Object3D {
    constructor(x, y, z) {
        super();
        this.add(new THREE.AxisHelper(100));
        this.add(new CarBack(5.5, 4.5, 5));
        this.add(new CarFront(16, 2, 5));
        this.add(new CarTop(15.5, 4.5, 5));
        this.add(new CarWheel(5, 0, -1, 0));
        this.add(new CarWheel(5, 0, 11, 0));
        this.add(new CarWheel(16, 0, -1, 0));
        this.add(new CarWheel(16, 0, 11, 0));
        this.add(new CarWheel(-1, 5, 5, 1));

        //booleans
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        this.upB = false;
        this.downB = false;

        //variables
        this.velocity=0;

        //constants
        this.maximumSpeed = 200;
        this.minimumSpeed = 0;
        this.aceleration = 1000;
        this.constantCurve = 1/2000;
    }

    getDOF(){
     var z_axis = this.getWorldDirection();
     return new THREE.Vector3(z_axis.getComponent(2), 0, -z_axis.getComponent(0));
   }

   checkMove(){
     var delta = clock.getDelta();

     if(keyState[38]){
       this.moveFoward(this.aceleration, delta);
     }
     if (keyState[40]) {
       this.moveBackwards(this.aceleration, delta);
     }
     if (this.upB) {
       this.moveFoward(-this.aceleration, delta);
     }
     if (this.downB) {
       this.moveBackwards(-this.aceleration, delta);
     }
     if(keyState[39]){
       this.turnRight();
     }
     else if (keyState[37]) {
       this.turnLeft();
     }
   }

   moveFoward(aceleration, delta){
     var deslocation;
     var vecPosition = new THREE.Vector3(0,0,0);
     if(this.velocity==0 && aceleration > 0){
       deslocation = Math.abs(Math.pow(delta,2)*aceleration/2);
       vecPosition = this.getDOF();
       vecPosition.setLength(deslocation);
       this.velocity = aceleration * delta;
     }
     else if (this.velocity!=0 && aceleration > 0) {
       deslocation = Math.abs((Math.pow(delta,2)*aceleration)/2 + this.velocity * delta)
       vecPosition = this.getDOF();
       vecPosition.setLength(deslocation);
       this.velocity = Math.min(aceleration * delta + this.velocity, this.maximumSpeed);
     }
     else if (this.velocity!=0 && aceleration < 0) {
       deslocation = Math.abs((Math.pow(delta,2)*aceleration)/2 + this.velocity * delta)
       vecPosition = this.getDOF();
       vecPosition.setLength(deslocation);
       this.velocity = Math.max(((aceleration*delta) + this.velocity), this.minimumSpeed);
     }
     else {
       this.up = false;
       this.upB = false;
     }
     this.position.x += vecPosition.x;
     this.position.y += vecPosition.y;
     this.position.z += vecPosition.z;
   }

   moveBackwards(aceleration, delta){
     var deslocation;
     var vecPosition = new THREE.Vector3(0,0,0);
     if(this.velocity==0 && aceleration > 0){
       deslocation = Math.abs(Math.pow(delta,2)*aceleration/2);
       vecPosition = this.getDOF();
       vecPosition.negate();
       vecPosition.setLength(deslocation);
       this.velocity = aceleration * delta;
     }
     else if (this.velocity!=0 && aceleration > 0) {
       deslocation = Math.abs((Math.pow(delta,2)*aceleration)/2 + this.velocity * delta)
       vecPosition = this.getDOF();
       vecPosition.negate();
       vecPosition.setLength(deslocation);
       this.velocity = Math.min(aceleration * delta + this.velocity, this.maximumSpeed);
     }
     else if (this.velocity!=0 && aceleration < 0) {
       deslocation = Math.abs((Math.pow(delta,2)*aceleration)/2 + this.velocity * delta)
       vecPosition = this.getDOF();
       vecPosition.negate();
       vecPosition.setLength(deslocation);
       this.velocity = Math.max(((aceleration*delta) + this.velocity), this.minimumSpeed);
     }
     else{
       this.down = false;
       this.downB = false;
     }
     this.position.x += vecPosition.x;
     this.position.y += vecPosition.y;
     this.position.z += vecPosition.z;
   }

   turnRight(){
     this.rotateY(-this.velocity * this.constantCurve)
   }

   turnLeft(){
     this.rotateY(this.velocity * this.constantCurve)
   }
}
