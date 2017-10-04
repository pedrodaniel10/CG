'use strict';

class ObjectBase extends THREE.Object3D {
    constructor(x, y, z) {
        super();
        this.position.set(x, y, z);
    }
}
