class SolidObject extends Object3D {
    constructor() {
        super();
        this.boundingVolume = null;
    }

    collides(solidObject) {
        if (!this.boundingVolume instanceof BoundingVolume ||
            !solidObject.boundingVolume instanceof BoundingVolume)
            return false;
        else
            return this.boundingVolume.collides(solidObject.boundingVolume);
    }

    collided(solidObject) {
        // abstract
    }

}
