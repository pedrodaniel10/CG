'use strict';

class AxisAlignedBoundingBox extends BoundingVolume {
    constructor(x, z, sx, sz) {
        super(x, z);
        this.size = new THREE.Vector2(sx, sz);
    }

    collides(boundingVolume) {
        if (boundingVolume instanceof BoundingSphere)
            return collisionSphereToAABB(boundingVolume, this);

        else if (boundingVolume instanceof AxisAlignedBoundingBox)
            return collisionAABBToAABB(this, boundingVolume);

        else
            return false;
    }

    //override
    update(delta) {
        // TODO
    }
}
