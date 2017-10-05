'use strict';

class Field extends Object3D {
    constructor(tableSIZEX,tableSIZEY,tableSIZEZ) {
        super();

        this.SIZE = 3;
        this.RADIUS = 1;
        this.OUTSIDE_MARGIN = 20;
        this.INSIDE_MARGIN = 110;
        this.X_N = 30;
        this.Z_N = 15;

        let k = this.OUTSIDE_MARGIN + this.SIZE;
        let fieldLength = tableSIZEX - 2*k;
        let fieldWidth = tableSIZEZ - 2*k;

        let n = 40;
        for (let x = -fieldLength / 2; x <= fieldLength / 2; x += fieldLength / n) {
            this.add(new Cheerio(x, 0, fieldWidth / 2, this.SIZE, this.RADIUS));
            this.add(new Cheerio(x, 0, -fieldWidth / 2, this.SIZE, this.RADIUS));
        }

        n = 18;
        for (let z = -fieldWidth / 2; z <= fieldWidth / 2; z += fieldWidth / n) {
            this.add(new Cheerio(fieldLength / 2, 0, z, this.SIZE, this.RADIUS));
            this.add(new Cheerio(-fieldLength / 2, 0, z, this.SIZE, this.RADIUS));
        }

        k = this.INSIDE_MARGIN + this.SIZE;
        fieldLength = tableSIZEX - 2*k;
        fieldWidth = tableSIZEZ - 2*k;

        n = 30;
        for (let x = -fieldLength / 2; x <= fieldLength / 2; x += fieldLength / n) {
            this.add(new Cheerio(x, 0, fieldWidth / 2, this.SIZE, this.RADIUS));
            this.add(new Cheerio(x, 0, -fieldWidth / 2, this.SIZE, this.RADIUS));
        }

        n = 8;
        for (let z = -fieldWidth / 2; z <= fieldWidth / 2; z += fieldWidth / n) {
            this.add(new Cheerio(fieldLength / 2, 0, z, this.SIZE, this.RADIUS));
            this.add(new Cheerio(-fieldLength / 2, 0, z, this.SIZE, this.RADIUS));
        }
    }

}
