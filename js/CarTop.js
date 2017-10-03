'use strict';

class CarTop extends ObjectBase {
    constructor(x, y, z, r) {
        super(x, y, z);
        this.geometry = new THREE.CubeGeometry(9, 1, 4);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff2b2b, wireframe: true});
    }
}
