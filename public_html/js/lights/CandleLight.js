'use strict';
class CandleLight extends THREE.Object3D {
    constructor(x, z) {
        super();
        this.light = new THREE.PointLight(0xffffff, 1, 240, 2);
        this.add(this.light);
        this.position.set(x, 40, z);
    }
}
