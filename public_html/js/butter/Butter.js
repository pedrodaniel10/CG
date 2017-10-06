'use strict';

class Butter extends Object3D {
    constructor(x, y, z) {
        super(x, y, z);
        
        this.position.set(x, y+10, z);
        
        this.butterBody = new ButterBody(0, 0, 0);

    }
}
