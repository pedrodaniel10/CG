'use strict';

class ButterBody extends Mesh {
    constructor(x, y, z) {
        super(x, y, z);
        this.geometry = new THREE.CubeGeometry(80, 20, 50);
        this.material = new THREE.MeshBasicMaterial({ color: 0xfffc75, wireframe: true});
    }
}
