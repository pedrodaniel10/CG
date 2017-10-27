'use strict';
class CandleBody extends Mesh {
    constructor(x, y, z) {
        super(x, y, z);
        this.geometry = new THREE.CubeGeometry(10, 40, 10);
        this.material = new THREE.MeshLambertMaterial({ color: 0xffe7bc, wireframe: true});
    }
}
