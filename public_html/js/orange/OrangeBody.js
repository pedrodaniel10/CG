'use strict';

class OrangeBody extends Mesh {
    constructor(x, y, z) {
        super(x, y, z);
        this.geometry = new THREE.SphereGeometry(30, 16, 16);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff8c00, wireframe: true});
    }
}
