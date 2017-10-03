'use strict';

class ObjectBase extends THREE.Mesh {
    constructor(x, y, z) {
        super();
        this.position.set(x, y, z);
    }
}
