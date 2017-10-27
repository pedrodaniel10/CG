'use strict';
class SunLight extends THREE.Object3D {
    constructor() {
        super();
        this.light = new THREE.DirectionalLight( 0xfff8e8, 0.9);
        this.add(this.light);
        this.position.set( 2, 9, 5 );
    }
}
