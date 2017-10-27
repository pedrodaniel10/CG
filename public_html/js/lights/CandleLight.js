'use strict';
class CandleLight extends Object3D {
    constructor(x, z) {
        super();

        this.light = new THREE.PointLight(0xffffff, 1, 260, 2);
        this.light.position.set(0, 25, 0);
        this.add(this.light);

        this.candleBody = new CandleBody(0, 0, 0);
        this.add(this.candleBody);

        this.position.set(x, 10, z);
    }
}
