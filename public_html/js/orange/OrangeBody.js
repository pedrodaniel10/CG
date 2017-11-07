'use strict';

class OrangeBody extends Mesh {
    constructor(x, y, z) {
        super(x, y, z);
        this.ORANGE_RADIUS = ORANGE_RADIUS;
        this.geometry = new THREE.SphereGeometry(this.ORANGE_RADIUS, 16, 16);
        this.material = new THREE.MeshLambertMaterial({ color: 0xff8c00, emissive: this.emissive, wireframe: true});
    }
}
