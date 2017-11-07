'use strict';

class OrangeLeaf extends Mesh {
    constructor(x, y, z) {
        super(x, y, z);
        this.geometry = new THREE.TorusGeometry(1, 3, 8, 10);
        this.material = new THREE.MeshLambertMaterial({ color: 0x0cff89, emissive: this.emissive, wireframe: true});
        this.rotation.x = Math.PI / 2;
        this.emissive = 1;
        this.specular = 1;
        this.shininess = 30;
    }
}
