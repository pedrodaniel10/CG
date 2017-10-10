'use strict';
var shiet1 = false;
var shiet2 = false;
class Car extends Object3D {
    constructor() {
        super();
        //Car components
        this.carBack = new CarBack(5.5, 4.5, 5);
        this.carFront = new CarFront(16, 2, 5);
        this.carTop = new CarTop(15.5, 4.5, 5);
        this.wheelBackLeft = new CarWheel(5, 0, -1, 0);
        this.wheelBackRight = new CarWheel(5, 0, 11, 0);
        this.wheelFrontLeft = new CarWheel(16, 0, -1, 0);
        this.wheelFrontRight = new CarWheel(16, 0, 11, 0);
        this.wheelBack = new CarWheel(-1, 5, 5, 1);

        //camera
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 500);
        this.camera.position.set(-55,30,0);
        this.camera.lookAt(new THREE.Vector3());

        //variables
        this.velocity = 0;
        this.lastKeyPressed ='u';

        //constants
        this.maximumSpeed = 180;
        this.minimumSpeed = 0;
        this.forwardAcceleration = 150;
        this.backwardAcceleration = 60;
        this.breakingFoward = 2;
        this.breakingBackward = 2.5;
        this.frictionBackwards = 2;
        this.constantCurve = 1/4000;
        this.wheelTurnAngle = 0.58904862;

        //add elements
        this.add(this.carBack);
        this.add(this.carFront);
        this.add(this.carTop);
        this.add(this.wheelBackLeft);
        this.add(this.wheelBackRight);
        this.add(this.wheelFrontLeft);
        this.add(this.wheelFrontRight);
        this.add(this.wheelBack);
        this.add(this.camera);
    }

    getDOF() {
     var z_axis = this.getWorldDirection();
     return new THREE.Vector3(z_axis.getComponent(2), 0, -z_axis.getComponent(0));
   }

   checkMove() {
     var delta = clock.getDelta();
     var dof = this.getDOF();
     var negateDof = this.getDOF();
     negateDof.negate();
     this.wheelFrontLeft.rotation.y = 0;
     this.wheelFrontRight.rotation.y = 0;

     if(!keyState[38] && keyState[40] && this.lastKeyPressed=='u') {
       if(this.velocity != 0)
          this.accelerate(-this.forwardAcceleration*this.breakingFoward, delta, dof);
       else {
          this.lastKeyPressed = 'd';
       }
     }
     else if (keyState[38] && !keyState[40] && this.lastKeyPressed=='d') {
       if(this.velocity != 0)
          this.accelerate(-this.backwardAcceleration*this.breakingBackward, delta, negateDof);
       else {
         this.lastKeyPressed = 'u';
       }
     }
     else if(keyState[38]) {
       if(this.lastKeyPressed == 'd') {
         this.velocity=0;
         this.lastKeyPressed = 'u';
       }
       this.accelerate(this.forwardAcceleration, delta, dof);
     }
     else if (keyState[40]) {
       if(this.lastKeyPressed == 'u') {
         this.velocity=0;
         this.lastKeyPressed = 'd';
       }
       this.accelerate(this.backwardAcceleration, delta, negateDof);
     }
     else if(!keyState[38] && !keyState[40] && this.lastKeyPressed=='u') {
       if(this.velocity != 0)
          this.accelerate(-this.forwardAcceleration, delta, dof);
     }
     else if (!keyState[38] && !keyState[40] && this.lastKeyPressed=='d') {
       if(this.velocity != 0) {
          this.accelerate(-this.backwardAcceleration * this.frictionBackwards, delta, negateDof);
      }
     }
     if(keyState[39]) {
       if (this.wheelFrontLeft.rotation.y > -this.wheelTurnAngle) {
         this.wheelFrontLeft.rotateY(-this.wheelTurnAngle);
         this.wheelFrontRight.rotateY(-this.wheelTurnAngle);
       }
       this.turnRight();
     }
     else if (keyState[37]) {
       if (this.wheelFrontLeft.rotation.y < this.wheelTurnAngle) {
         this.wheelFrontLeft.rotateY(this.wheelTurnAngle);
         this.wheelFrontRight.rotateY(this.wheelTurnAngle);
       }
       this.turnLeft();
     }
   }

   accelerate(acceleration, delta, direction) {
     var deslocation;

     this.directionMove = direction.clone();
     if(this.velocity==0 && acceleration > 0) {
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

   turnRight() {
     if(this.lastKeyPressed == 'u')
        this.rotateY(-this.velocity * this.constantCurve);
     else
        this.rotateY(this.velocity * this.constantCurve);
   }

   turnLeft() {
     if(this.lastKeyPressed == 'u')
        this.rotateY(this.velocity * this.constantCurve);
     else {
        this.rotateY(-this.velocity * this.constantCurve);
     }
   }
   //override
   update() {
      this.checkMove();
   }
}
