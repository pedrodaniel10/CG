'use strict';

class Cheerio extends SolidObject {
    constructor(x, y, z, size, radius) {
        super();
        this.cheerioBody = new CheerioBody(0, 0, 0, size, radius);
        this.boundingVolume = new BoundingSphere(0, 0, size + radius);

        this.add(this.cheerioBody);
        this.add(this.boundingVolume);
        this.position.set(x, y, z);
    }

    //override
    update(delta) {
        //this.checkMove(delta);
    }

    //override
    collided(solidObject) {
        if (solidObject instanceof Car ||
            solidObject instanceof Cheerio) {
            // TODO mover cheerio
        }
        return 0;
    }
}
