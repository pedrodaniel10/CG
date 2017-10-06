'use strict';

class Orange extends Object3D {
    constructor(x, y, z) {
        super(x, y, z);
        this.orangeBody = new OrangeBody(0, 0, 0);
        this.orangeLeaf = new OrangeLeaf(5, 34, 5);

        this.add(this.orangeBody);
        this.add(this.orangeLeaf);
        this.position.x = x;
        this.position.y = y + 30;
        this.position.z = z;
    }

}
