'use strict';

class Butter extends Object3D {
    constructor(x, y, z) {
        super(x, y, z);
        this.add(new ButterBody(0, 0, 0));
        this.position.x = x;
        this.position.y = y + 10;
        this.position.z = z;
    }
}
