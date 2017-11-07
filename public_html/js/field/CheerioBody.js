'use strict';

class CheerioBody extends Mesh {
    constructor(x, y, z, s, r) {
        super(x, y, z);
        this.geometry = new THREE.TorusGeometry(s, r, 4, 8);
        this.material = new THREE.MeshLambertMaterial({ color: 0xe68200, emissive: this.emissive, wireframe: true});
        this.rotation.x = Math.PI / 2;
        this.position.y = y + r;
        this.emissive = 1;
        this.specular = 1;
        this.shininess = 20;
    }
}
