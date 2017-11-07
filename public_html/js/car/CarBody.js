class CarBody extends Mesh {
  constructor(x, y, z) {
    super(x,y,z);
    this.material = new THREE.MeshLambertMaterial({ color: 0xff2b2b, emissive: this.emissive, wireframe: true});
    this.emissive = 1;
    this.specular = 1;
    this.shininess = 30;


    // sides
    for (let z = -5; z <= 5; z += 10) {
        this.addVertex(-10, 0, z); // 0, 6
        this.addVertex(1, 4, z); // 1, 7
        this.addVertex(-10, 9, z); // 2, 8
        this.addVertex(1, 9, z); // 3, 9
        this.addVertex(11, 0, z); // 4, 10
        this.addVertex(11, 4, z); // 5, 11
    }

    // right side
    this.addFace(0, 2, 1);
    this.addFace(1, 2, 3);
    this.addFace(0, 1, 4);
    this.addFace(1, 5, 4);

    // left side
    this.addFace(6, 7, 8);
    this.addFace(7, 9, 8);
    this.addFace(6, 10, 7);
    this.addFace(7, 10, 11);

    // top
    this.addFace(2, 8, 3);
    this.addFace(3, 8, 9);
    // hood
    this.addFace(1, 7, 5);
    this.addFace(5, 7, 11);
    // window
    this.addFace(1, 3, 9);
    this.addFace(1, 9, 7);
    // front
    this.addFace(4, 5, 11);
    this.addFace(4, 11, 10);
    // back
    this.addFace(0, 8, 2);
    this.addFace(0, 6, 8);

    this.geometry.computeFaceNormals();
  }

}
