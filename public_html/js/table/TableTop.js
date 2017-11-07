'use strict';

class TableTop extends Mesh {
    constructor(x, y, z, sx, sy, sz) {
        super(x, y - (sy / 2), z);
        this.geometry = new THREE.CubeGeometry(sx, sy, sz, 30, 1, 15);
        this.material = new THREE.MeshLambertMaterial({ color: 0xc4f6ff, emissive: this.emissive, wireframe: true});
        this.emissive = 1;
        this.specular = 1;
        this.shininess = 30;
    }
}
