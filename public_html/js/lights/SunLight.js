'use strict';
class SunLight extends Object3D {
    constructor() {
        super();
        this.light = new THREE.DirectionalLight( 0xffffff, 1);
        this.add(this.light);
        this.position.set( 7, 9, 5 );
    }
}
