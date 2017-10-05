'use strict';
var shiet1 = false;
var shiet2 = false;
class Car extends Object3D {
    constructor() {
        super();
        //this.add(new THREE.AxisHelper(100));
        this.add(new CarBack(5.5, 4.5, 5));
        this.add(new CarFront(16, 2, 5));
        this.add(new CarTop(15.5, 4.5, 5));
        this.add(new CarWheel(5, 0, -1, 0));
        this.add(new CarWheel(5, 0, 11, 0));
        this.add(new CarWheel(16, 0, -1, 0));
        this.add(new CarWheel(16, 0, 11, 0));
        this.add(new CarWheel(-1, 5, 5, 1));

        //variables
        this.velocity = 0;
        this.lastKeyPressed="up";

        //constants
        this.maximumSpeed = 180;
        this.minimumSpeed = 0;
        this.forwardAcceleration = 150;
        this.backwardAcceleration = 60;
        this.breakingFoward = 2;
        this.breakingBackward = 2.5;
        this.frictionBackwards = 2;
        this.constantCurve = 1/4000;
    }

    getDOF(){
     var z_axis = this.getWorldDirection();
     return new THREE.Vector3(z_axis.getComponent(2), 0, -z_axis.getComponent(0));
   }

   checkMove(){
     var delta = clock.getDelta();
     var dof = this.getDOF();
     var negateDof = this.getDOF();
     negateDof.negate();

     if(!keyState[38] && keyState[40] && this.lastKeyPressed=="up"){
       if(this.velocity != 0)
          this.accelerate(-this.forwardAcceleration*this.breakingFoward, delta, dof);
       else {
          this.lastKeyPressed = "down";
       }
     }
     else if (keyState[38] && !keyState[40] && this.lastKeyPressed=="down") {
       if(this.velocity != 0)
          this.accelerate(-this.backwardAcceleration*this.breakingBackward, delta, negateDof);
       else {
         this.lastKeyPressed = "up";
       }
     }
     else if(keyState[38]){
       if(this.lastKeyPressed == "down"){
         this.velocity=0;
         this.lastKeyPressed = "up";
       }
       this.accelerate(this.forwardAcceleration, delta, dof);
     }
     else if (keyState[40]) {
       if(this.lastKeyPressed == "up"){
         this.velocity=0;
         this.lastKeyPressed = "down";
       }
       this.accelerate(this.backwardAcceleration, delta, negateDof);
     }
     else if(!keyState[38] && !keyState[40] && this.lastKeyPressed=="up"){
       if(this.velocity != 0)
          this.accelerate(-this.forwardAcceleration, delta, dof);
     }
     else if (!keyState[38] && !keyState[40] && this.lastKeyPressed=="down") {
       if(this.velocity != 0){
          this.accelerate(-this.backwardAcceleration * this.frictionBackwards, delta, negateDof);
      }
     }
     if(keyState[39]){
       this.turnRight();
     }
     else if (keyState[37]) {
       this.turnLeft();
     }
   }

   accelerate(acceleration, delta, direction){
     var deslocation;

     this.directionMove = direction.clone();
     if(this.velocity==0 && acceleration > 0){
       deslocation = Math.abs(Math.pow(delta,2)*acceleration/2);
       direction.setLength(deslocation);
       this.velocity = acceleration * delta;
     }
     else if (this.velocity!=0 && acceleration > 0) {
       deslocation = Math.abs((Math.pow(delta,2)*acceleration)/2 + this.velocity * delta)
       direction.setLength(deslocation);
       this.velocity = Math.min(acceleration * delta + this.velocity, this.maximumSpeed);
     }
     else if (this.velocity!=0 && acceleration < 0) {
       deslocation = Math.abs((Math.pow(delta,2)*acceleration)/2 + this.velocity * delta)
       direction.setLength(deslocation);
       this.velocity = Math.max(((acceleration*delta) + this.velocity), this.minimumSpeed);
     }
     this.position.x += direction.x;
     this.position.y += direction.y;
     this.position.z += direction.z;
   }

   turnRight(){
     if(this.lastKeyPressed == "up")
        this.rotateY(-this.velocity * this.constantCurve);
     else
        this.rotateY(this.velocity * this.constantCurve);
   }

   turnLeft(){
     if(this.lastKeyPressed == "up")
        this.rotateY(this.velocity * this.constantCurve);
     else {
        this.rotateY(-this.velocity * this.constantCurve);
     }
   }
}
