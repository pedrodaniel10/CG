class CarBack extend ObjectBase{
  constructor(x, y, z){
    super(x,y,z);
    this.geometry = new THREE.CubeGeometry(x,y,z);
    this.material = new THREE.MeshBasicMaterial({ color: 0xff2b2b, wireframe: true});
  }
}
