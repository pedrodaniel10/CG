'use strict';

class BoundingSphere extends BoundingVolume {
    constructor(x, z, r) {
        super(x, z);
        this.radius = r;
    }

    collides(boundingVolume) {
        if (boundingVolume instanceof BoundingSphere)
            return collisionSphereToSphere(this, boundingVolume);

        else if (boundingVolume instanceof AxisAlignedBoundingBox)
            return collisionSphereToAABB(this, boundingVolume);

        else
            return false;
    }
}
