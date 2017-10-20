'use strict';

class BoundingSphere extends BoundingVolume {
    constructor(x, y, z, r) {
        super(x, y, z);
        this.radius = r;
    }
    
    collides(boundingVolume) {
        if (boundingVolume instanceof BoundingSphere) {
            return this.radius + boundingVolume.radius <= this.centerDistanceTo(boundingVolume);
        }
        else {
            return false;
        }
    }
}