'use strict';

class CarWheel extends Mesh {
    constructor(x, y, z, rot, radius) {
        super(x, y, z);
        this.material = new THREE.MeshLambertMaterial({ color: 0x000000, wireframe: true});

        let nSegments = 16;

        // inner and outer center vertices
        this.addVertex(0, 0, -1); // 0
        this.addVertex(0, 0, 1); // 1

        // circunferences
        this.addVertexCircunference(0, 0, -1, radius, nSegments);
        this.connectCircToCenter(0, nSegments, -1);
        this.addVertexCircunference(0, 0, 1, radius, nSegments);
        this.connectCircToCenter(1, nSegments, 1);
        this.connectCircunferences(nSegments);

        this.geometry.computeFaceNormals();
        this.rotation.y = rot * Math.PI / 2;
    }
}
