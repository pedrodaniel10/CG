'use strict';

class CheerioBody extends Mesh {
    constructor(x, y, z, s, r) {
        super(x, y, z);
        this.geometry = new THREE.TorusGeometry(s, r, 4, 8);
        this.material = new THREE.MeshBasicMaterial({ color: 0xe68200, wireframe: true});
        this.rotation.x = Math.PI / 2;
        this.position.y = y + r;
    }
}
