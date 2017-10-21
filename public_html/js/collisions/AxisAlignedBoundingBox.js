'use strict';

class AxisAlignedBoundingBox extends BoundingVolume {
    constructor(x, z, sx, sz) {
        super(x, z);
        this.hsize = new THREE.Vector2(sx / 2, sz / 2);
    }

    distanceTo(point) {
        /* get global center positon */
        let center = new THREE.Vector3();
        center.setFromMatrixPosition(this.matrixWorld);

        /* get the corner points of the rectangle */
        let minx = center.x - this.hsize.x;
        let maxx = center.x + this.hsize.x;
        let minz = center.z - this.hsize.y;
        let maxz = center.z + this.hsize.y;

        /* calculate distance */
        var dist = new THREE.Vector2(
                Math.max(minx - point.x, 0, point.x - maxx),
                Math.max(minz - point.y, 0, point.y - maxz)
            );
        return dist.length();
    }

    //override
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
