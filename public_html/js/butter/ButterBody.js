'use strict';

class ButterBody extends Mesh {
    constructor(x, y, z) {
        super(x, y, z);
        this.geometry = new THREE.CubeGeometry(64, 20, 40, 8, 2, 4);
        this.material = new THREE.MeshLambertMaterial({ color: 0xfffc75, emissive: this.emissive, wireframe: true});
        this.shininess = 75;
    }
}
