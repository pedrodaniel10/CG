'use strict';

class Orange extends Object3D {
    constructor(x, y, z) {
        super(x, y, z);
        this.add(new OrangeBody(0, 0, 0));
        this.add(new OrangeLeaf(5, 34, 5));
        this.position.x = x;
        this.position.y = y + 30;
        this.position.z = z;
    }
}
