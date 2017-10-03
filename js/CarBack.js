class CarBack extends Mesh {
  constructor(x, y, z){
    super(x,y,z);
    this.geometry = new THREE.CubeGeometry(11, 9, 10);
    this.material = new THREE.MeshBasicMaterial({ color: 0xff2b2b, wireframe: true});
  }
}
