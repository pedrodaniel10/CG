'use strict';

function collisionSphereToSphere(sphere1, sphere2) {
    let pos1 = new THREE.Vector3();
    let pos2 = new THREE.Vector3();
    pos1.setFromMatrixPosition(sphere1.matrixWorld);
    pos2.setFromMatrixPosition(sphere2.matrixWorld);
    return sphere1.radius + sphere2.radius <= pos1.centerDistanceTo(pos2);
}

function collisionSphereToAABB(sphere, aabb) {
    // TODO
    let pos1 = new THREE.Vector3();
    let pos2 = new THREE.Vector3();
    pos1.setFromMatrixPosition(sphere.matrixWorld);
    pos2.setFromMatrixPosition(aabb.matrixWorld);
    //return sphere1.radius + sphere2.radius <= sphere1.centerDistanceTo(sphere2);
}

function collisionAABBToAABB(aabb1, aabb2) {
    // TODO
    let pos1 = new THREE.Vector3();
    let pos2 = new THREE.Vector3();
    pos1.setFromMatrixPosition(aabb1.matrixWorld);
    pos2.setFromMatrixPosition(aabb2.matrixWorld);
    //return sphere1.radius + sphere2.radius <= sphere1.centerDistanceTo(sphere2);
}
