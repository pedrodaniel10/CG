'use strict';

var shiet1 = false;
var shiet2 = false;

var CAR_RADIUS = 12;

class Car extends SolidObject {
    constructor() {
        super();
        this.setInitialPosition();

        this.wheelRadius = 2.8;

        //Car components
        this.carBody = new CarBody(0, this.wheelRadius, 0);
        this.carHood = new CarHood(1, this.wheelRadius+4, 0, 5);
        this.wheelBackLeft = new CarWheel(-5, this.wheelRadius, 6, 0, this.wheelRadius);
        this.wheelBackRight = new CarWheel(-5, this.wheelRadius, -6, 0, this.wheelRadius);
        this.wheelFrontLeft = new CarWheel(6, this.wheelRadius, 6, 0, this.wheelRadius);
        this.wheelFrontRight = new CarWheel(6, this.wheelRadius, -6, 0, this.wheelRadius);
        this.wheelBack = new CarWheel(-11, this.wheelRadius+5, 0, 1, this.wheelRadius);


        this.meshList.push(this.carBody);
        this.meshList.push(this.carHood);
        this.meshList.push(this.wheelBackLeft);
        this.meshList.push(this.wheelBackRight);
        this.meshList.push(this.wheelFrontLeft);
        this.meshList.push(this.wheelFrontRight);
        this.meshList.push(this.wheelBack);

        //HeadLights
        this.leftHeadLight = new HeadLight(11,7,-5);
        this.rightHeadLight = new HeadLight(11,7,5);
        this.add(this.leftHeadLight);
        this.add(this.rightHeadLight);

        //collisions
        this.boundingVolume = new BoundingSphere(0, 0, CAR_RADIUS);

        //camera
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
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
        this.addMeshesFromList();
        this.add(this.boundingVolume)
        this.add(this.camera);
    }

    getDOF() {
        var z_axis = this.getWorldDirection();
        return new THREE.Vector3(z_axis.getComponent(2), 0, -z_axis.getComponent(0));
    }

    checkMove(delta) {
        var dof = this.getDOF();
        var negateDof = this.getDOF();
        negateDof.negate();
        this.wheelFrontLeft.rotation.y = 0;
        this.wheelFrontRight.rotation.y = 0;

        if(!keyState[38] && keyState[40] && this.lastKeyPressed=='u') {
            this.goingBackwards = 0;
            if(this.velocity != 0)
            this.accelerate(-this.forwardAcceleration*this.breakingFoward, delta, dof);
            else {
                this.lastKeyPressed = 'd';
            }
        }
        else if (keyState[38] && !keyState[40] && this.lastKeyPressed=='d') {
            this.goingBackwards = 1;
            if(this.velocity != 0)
            this.accelerate(-this.backwardAcceleration*this.breakingBackward, delta, negateDof);
            else {
                this.lastKeyPressed = 'u';
            }
        }
        else if(keyState[38]) {
            this.goingBackwards = 0;
            if(this.lastKeyPressed == 'd') {
                this.velocity=0;
                this.lastKeyPressed = 'u';
            }
            this.accelerate(this.forwardAcceleration, delta, dof);
        }
        else if (keyState[40]) {
            this.goingBackwards = 1;
            if(this.lastKeyPressed == 'u') {
                this.velocity=0;
                this.lastKeyPressed = 'd';
            }
            this.accelerate(this.backwardAcceleration, delta, negateDof);
        }
        else if(!keyState[38] && !keyState[40] && this.lastKeyPressed=='u') {
            this.goingBackwards = 0;
            if(this.velocity != 0)
            this.accelerate(-this.forwardAcceleration, delta, dof);
        }
        else if (!keyState[38] && !keyState[40] && this.lastKeyPressed=='d') {
            this.goingBackwards = 1;
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

        this.lastPosX = this.position.x;
        this.lastPosY = this.position.y;
        this.lastPosZ = this.position.z;

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

    setInitialPosition(){
      this.position.set(0,0,130);
    }

    setInitialDirection(){
      var dof = this.getDOF();
      var angle = dof.angleTo(X_AXIS_WORLD);

      if(dof.z > 0){
        this.rotateY(angle);
      }
      else{
        this.rotateY(-angle);
      }
    }

    setPosition(x,y,z){
      this.position.set(x,y,z);
    }

    setDirection(direction){
      var dof = this.getDOF();
      var angle = dof.angleTo(direction);
      if(dof.z > 0){
        this.rotateY(angle);
      }
      else{
        this.rotateY(-angle);
      }
    }

    resize(factor){
      this.scale.set(factor,factor,factor);
    }

    setHeadLight(boolean){
      this.rightHeadLight.setHeadLight(boolean);
      this.leftHeadLight.setHeadLight(boolean);
    }

    //override
    update(delta) {
        this.checkMove(delta);
    }

    //override
    collided(solidObject, delta) {
        if (solidObject instanceof Butter) {
            this.position.x = lastCarPosX;
            this.position.z = lastCarPosZ;
            let dof = this.getDOF();
                if (!this.goingBackwards) {
                    dof.negate();
                }
            this.accelerate(1000, delta, dof);
            this.velocity = 0;
        }
        //car lost game, orange velocities must reset
        else if (solidObject instanceof Orange ||
            solidObject instanceof FieldLimit) {
            this.position.set(0, 0, 0);
            this.velocity = 0;
            carLost();
        }

        else if (solidObject instanceof Cheerio) {
            if (this.velocity >= 75) {
                this.velocity = this.velocity - 50;
            }
        }
    }
}
