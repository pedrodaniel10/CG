'use strict';

var BUTTER_RADIUS = 95;

class Butter extends SolidObject {
    constructor(x, y, z) {
        super(x, y, z);
        this.position.set(x, y+10, z);

        this.butterBody = new ButterBody(0, 0, 0);
        this.boundingVolume = new BoundingSphere(0, 0, 95);

        this.add(this.butterBody);
        this.add(this.boundingVolume);
    }
}
