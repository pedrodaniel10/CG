'use strict';

class TableTop extends Mesh {
    constructor(x, y, z, sx, sy, sz) {
        super(x, y, z);
        this.geometry = new THREE.CubeGeometry(sx, sy, sz);
        this.material = new THREE.MeshBasicMaterial({ color: 0xc4f6ff, wireframe: true});
    }
}
