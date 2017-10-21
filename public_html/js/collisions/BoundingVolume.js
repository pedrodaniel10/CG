'use strict';

class BoundingVolume extends Object3D {
    constructor(x, z) {
        super(x, 0, z);
    }

    collides(boundingVolume) {
        /* abstract method */
        return false;
    }
}
