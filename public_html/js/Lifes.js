'use strict';

class Lifes extends THREE.Object3D {
  constructor(){
    super();

    //number of lifes
    this.lifes = 5;
    this.lifesRemaining = this.lifes;

    //scale
    this.widthScale = 1/4;
    this.heightScale = 1/8;

    //viewport to render: goes from (x,y) to (x + width, y + height)
    this.x = 0;
    this.y = (1-this.heightScale) * window.innerHeight;
    this.width = this.widthScale * window.innerWidth;
    this.height = this.heightScale * window.innerHeight;

    //camera
    this.left = this.width / -orthographicScale;
    this.right = this.width / orthographicScale;
    this.top = this.height / orthographicScale;
    this.bottom = this.height / -orthographicScale;

    this.camera = new THREE.OrthographicCamera(this.left, this.right, this.top, this.bottom, 1, 400);

    this.camera.position.set(0,200,0);
    this.camera.lookAt(new THREE.Vector3()); //look to origin

    //cars
    this.carsList =[];
    this.carWidth = 12;
    this.carHeigth = 15;
    this.carDirection = new THREE.Vector3(0,0,-1);
    this.carResizeLimit = 1.5;
    this.paddingBetweenCars = 10;
    this.totalPadding = this.paddingBetweenCars * (this.lifes + 1);
    this.totalWidth = 2 * this.right;
    this.totalHeigth = 2 * this.top;

    this.createCars();
  }

  createCars(){
    var resize = Math.min(this.carResizeLimit, this.calculateResize());
    var increment = this.paddingBetweenCars + this.carWidth * resize;

    for(let i = 1, pointer = this.left; i <= this.lifes; i++, pointer+=increment){
      var car = new Car();
      car.wireframeOn();
      car.toBasic();
      car.setDirection(this.carDirection);
      car.resize(resize);
      car.setPosition(pointer + this.paddingBetweenCars + (this.carWidth * resize)/2,0,0);

      this.carsList.push(car);
      this.add(car);
    }
  }

  calculateResize(){
    return Math.min((this.totalWidth-this.totalPadding)/(Math.pow(this.lifes,1) * this.carWidth),
                    this.totalHeigth / this.carHeigth);
  }

  takeLife(){
    this.lifesRemaining--;
    this.carsList[this.lifesRemaining].visible = false;
  }

  restart(){
    this.lifesRemaining = this.lifes;
    for(let i = 0; i < this.carsList.length; i++){
      this.carsList[i].visible = true;
    }
  }

  removeCarsList(){
    for(let i = 0; i < this.carsList.length; i++){
      this.remove(this.carsList[i]);
    }
  }

  visibleOnlyLifesRemaining(){
    for(let i = this.lifes - 1; i >= this.lifesRemaining; i--){
      this.carsList[i].visible = false;
    }
  }

  cameraOnResize(newWidth, newHeigth){
    this.camera.left = this.left =this.widthScale * newWidth / -orthographicScale;
    this.camera.right = this.right = this.widthScale * newWidth / orthographicScale;
    this.camera.top = this.top = this.heightScale * newHeigth / orthographicScale;
    this.camera.bottom = this.bottom = this.heightScale * newHeigth / -orthographicScale;
    this.camera.updateProjectionMatrix();

    this.x = 0;
    this.y = (1-this.heightScale) * newHeigth;
    this.width = this.widthScale * newWidth;
    this.height = this.heightScale * newHeigth;

    this.removeCarsList();
    this.createCars();
    this.visibleOnlyLifesRemaining();
  }
}
