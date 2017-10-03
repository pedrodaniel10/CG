'use strict';

class CarTop extends Mesh {
    constructor(x, y, z, r) {
        super(x, y, z);
        this.translateX(-10.5);
        this.translateY(3);
        this.translateZ(-5);
        this.geometry = new THREE.CubeGeometry(9, 1, 4);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff2b2b, wireframe: true});
    }
}
