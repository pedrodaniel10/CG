'use strict';

class OrangeLeaf extends Mesh {
    constructor(x, y, z) {
        super(x, y, z);
        this.geometry = new THREE.TorusGeometry(1, 6, 16, 32);
        this.material = new THREE.MeshBasicMaterial({ color: 0x0cff89, wireframe: true});
        this.rotation.x = Math.PI / 2;
    }
}
