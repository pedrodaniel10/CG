'use strict';

class CarWheel extends Mesh {
    constructor(x, y, z, r) {
        super(x, y, z);
        this.translateX(-10.5);
        this.translateY(3);
        this.translateZ(-5);
        this.geometry = new THREE.TorusGeometry(1, 1, 16, 32);
        this.material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true});
        this.rotation.y = r * Math.PI / 2;
    }
}
