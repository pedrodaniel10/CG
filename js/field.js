'use strict';

class Field extends Object3D {
    constructor() {
        super();

        this.TORUS_SIZE = 3;
        this.TORUS_RADIUS = 1;
        this.TORUS_OUTSIDE_MARGIN = 20;
        this.TORUS_INSIDE_MARGIN = 110;
        this.TORUS_X_N = 30;
        this.TORUS_Z_N = 15;

        let k = this.TORUS_OUTSIDE_MARGIN + this.TORUS_SIZE;
        let fieldLength = this.TABLE_SIZEX - 2*k;
        let fieldWidth = this.TABLE_SIZEZ - 2*k;

        let n = 40;
        for (let x = -fieldLength / 2; x <= fieldLength / 2; x += fieldLength / n) {
            this.add(new Cheerio(field, x, 0, fieldWidth / 2, TORUS_SIZE, TORUS_RADIUS));
            this.add(new Cheerio(field, x, 0, -fieldWidth / 2, TORUS_SIZE, TORUS_RADIUS));
        }

        n = 18;
        for (let z = -fieldWidth / 2; z <= fieldWidth / 2; z += fieldWidth / n) {
            this.add(new Cheerio(field, fieldLength / 2, 0, z, TORUS_SIZE, TORUS_RADIUS));
            this.add(new Cheerio(field, -fieldLength / 2, 0, z, TORUS_SIZE, TORUS_RADIUS));
        }

        k = this.TORUS_INSIDE_MARGIN + this.TORUS_SIZE;
        fieldLength = this.TABLE_SIZEX - 2*k;
        fieldWidth = this.TABLE_SIZEZ - 2*k;

        n = 30;
        for (let x = -fieldLength / 2; x <= fieldLength / 2; x += fieldLength / n) {
            this.add(new Cheerio(field, x, 0, fieldWidth / 2, TORUS_SIZE, TORUS_RADIUS));
            this.add(new Cheerio(field, x, 0, -fieldWidth / 2, TORUS_SIZE, TORUS_RADIUS));
        }

        n = 8;
        for (let z = -fieldWidth / 2; z <= fieldWidth / 2; z += fieldWidth / n) {
            this.add(new Cheerio(field, fieldLength / 2, 0, z, TORUS_SIZE, TORUS_RADIUS));
            this.add(new Cheerio(field, -fieldLength / 2, 0, z, TORUS_SIZE, TORUS_RADIUS));
        }
    }
}
