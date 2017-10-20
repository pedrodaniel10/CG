'use strict';

class AxisAlignedBoundingBox extends BoundingVolume {
    constructor(x, y, z, sx, sy, sz) {
        super(x, y, z);
        this.size = THREE.Vector3D(sx, sy, sz);
    }

    collides(boundingVolume) {
        if (boundingVolume instanceof BoundingSphere)
            return collisionSphereToAABB(boundingVolume, this);

        else if (boundingVolume instanceof AxisAlignedBoundingBox)
            return collisionAABBToAABB(this, boundingVolume);
            
        else
            return false;
    }
}
