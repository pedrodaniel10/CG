'use strict';

function collisionSphereToSphere(sphere1, sphere2) {
    return sphere1.radius + sphere2.radius <= sphere1.centerDistanceTo(sphere2);
}

function collisionSphereToAABB(sphere, aabb) {
    return sphere1.radius + sphere2.radius <= sphere1.centerDistanceTo(sphere2);
}

function collisionAABBToAABB(aabb1, aabb2) {
    return sphere1.radius + sphere2.radius <= sphere1.centerDistanceTo(sphere2);
}
