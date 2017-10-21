'use strict';

class FieldLimit extends SolidObject {
    constructor(x, z, sx, sz) {
        super();

        this.boundingVolume = new AxisAlignedBoundingBox(0, 0, sx, sz);

        this.add(this.boundingVolume);
        this.position.set(x, 0, z);
    }
}
