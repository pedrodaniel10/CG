'use strict';

class BoundingVolume extends Object3D {
    constructor(x, z) {
        super(x, 0, z);
    }

    centerDistanceTo(boundingVolume) {
        return this.position.distanceTo(boundingVolume.position);
    }

    collides(boundingVolume) {
        /* abstract method */
        return false;
    }
}
