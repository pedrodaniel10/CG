'use strict';

function collisionSphereToSphere(sphere1, sphere2) {
    let pos1 = new THREE.Vector3();
    let pos2 = new THREE.Vector3();
    pos1.setFromMatrixPosition(sphere1.matrixWorld);
    pos2.setFromMatrixPosition(sphere2.matrixWorld);
    return sphere1.radius + sphere2.radius >= pos1.distanceTo(pos2);
}

function collisionSphereToAABB(sphere, aabb) {
    let pos_sphere = new THREE.Vector3();
    pos_sphere.setFromMatrixPosition(sphere.matrixWorld);
    return sphere.radius >= aabb.distanceTo(pos_sphere);
}

function collisionAABBToAABB(aabb1, aabb2) {
    let pos1 = new THREE.Vector3();
    let pos2 = new THREE.Vector3();
    pos1.setFromMatrixPosition(aabb1.matrixWorld);
    pos2.setFromMatrixPosition(aabb2.matrixWorld);
    return Math.abs(pos1.x - pos2.x) <= (aabb1.hsize.x + aabb2.hsize.x) &&
        Math.abs(pos1.z - pos2.z) <= (aabb1.hsize.z + aabb2.hsize.z);
}
