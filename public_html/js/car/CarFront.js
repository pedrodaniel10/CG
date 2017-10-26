'use strict';

class CarFront extends Mesh {
    constructor(x, y, z, r) {
        super(x, y, z);
        this.translateX(-10.5);
        this.translateY(3);
        this.translateZ(-5);
        this.geometry = new THREE.CubeGeometry(10, 4, 10);
        this.material = new THREE.MeshLambertMaterial({ color: 0xfcfcfc, wireframe: true});
    }

}
