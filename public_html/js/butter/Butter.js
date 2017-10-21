'use strict';

var BUTTER_RADIUS = 47.5;
var BOUNDING_LENGTH = 87;
var BOUNDING_WIDTH = 57;

class Butter extends SolidObject {
    constructor(x, y, z, rot_y) {
        super(x, y, z);
        this.position.set(x, y+10, z);
        this.butterBody = new ButterBody(0, 0, 0);
        if (rot_y < 0.78) {
            this.boundingVolume = new AxisAlignedBoundingBox(0, 0, BOUNDING_LENGTH, BOUNDING_WIDTH);
        }
        else {
            this.boundingVolume = new AxisAlignedBoundingBox(0, 0, BOUNDING_WIDTH, BOUNDING_LENGTH);
        }

        this.add(this.butterBody);
        this.add(this.boundingVolume);
        this.rotateY(rot_y);
    }
}
