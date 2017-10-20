'use strict';

class BoundingVolume extends Object3D {
    constructor(x, y, z) {
        super(x, y, z);
    }

    centerDistanceTo(boundingVolume) {
        return this.position.distanceTo(boundingVolume.position);
    }

    collides(boundingVolume) {
        // abstract method
        return false;
    }
}
