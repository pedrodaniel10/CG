'use strict';

class CarFront extends ObjectBase {
    constructor(x, y, z, r) {
        super(x, y, z);
        this.geometry = new THREE.CubeGeometry(10, 4, 10);
        this.material = new THREE.MeshBasicMaterial({ color: 0xfcfcfc, wireframe: true});
    }
}
