'use strict';

class CarHood extends Mesh {
    constructor(x, y, z, w) {
        super(x, y, z);
        this.material = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: this.emissive, wireframe: true});
        this.shininess = 300;

        // bottom vertices
        let w2 = w / 2;
        this.addVertex(0, 0, -w2); // 0
        this.addVertex(0, 0, w2); // 1
        this.addVertex(9, 0, -w2); // 2
        this.addVertex(9, 0, w2); // 3

        // top vertices
        w2--;
        this.addVertex(0, 1, -w2); // 4
        this.addVertex(0, 1, w2); // 5
        this.addVertex(9, 1, -w2); // 6
        this.addVertex(9, 1, w2); // 7

        // right side
        this.addFace(0, 4, 6);
        this.addFace(0, 6, 2);

        // left side
        this.addFace(1, 3, 7);
        this.addFace(1, 7, 5);

        // top
        this.addFace(4, 5, 7);
        this.addFace(4, 7, 6);

        // front
        this.addFace(2, 6, 7);
        this.addFace(2, 7, 3);

        this.geometry.computeFaceNormals();
    }
}
