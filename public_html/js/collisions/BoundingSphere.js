'use strict';

class BoundingSphere extends BoundingVolume {
    constructor(x, z, r) {
        super(x, z);
        this.radius = r;
        /*var geometry = new THREE.SphereGeometry(this.radius, 16, 16);
        var material = new THREE.MeshBasicMaterial({ color: 0x0cff89, wireframe: true});
        let mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);*/
    }

    //override
    collides(boundingVolume) {
        if (boundingVolume instanceof BoundingSphere)
            return collisionSphereToSphere(this, boundingVolume);

        else if (boundingVolume instanceof AxisAlignedBoundingBox)
            return collisionSphereToAABB(this, boundingVolume);

        else
            return false;
    }
}
