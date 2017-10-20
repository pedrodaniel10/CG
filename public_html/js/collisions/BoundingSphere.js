'use strict';

class BoundingSphere extends BoundingVolume {
    constructor(x, y, z, r) {
        super(x, y, z);
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
