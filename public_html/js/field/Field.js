'use strict';

class Field {
    constructor(tableSIZEX, tableSIZEY, tableSIZEZ) {
        this.SIZE = 3;
        this.RADIUS = 1;
        this.OUTSIDE_MARGIN = 20;
        this.INSIDE_MARGIN = 110;
        this.X_N = 30;
        this.Z_N = 15;
        this.tableSize = new THREE.Vector3(tableSIZEX, tableSIZEY, tableSIZEZ);

        /* cheerios */
        this.cheerios = [];

        this.createCheerios();

        /* field limits */
        this.fieldLimits = [];

        let wallThickness = 128;

        this.fieldLimits = [
            new FieldLimit(
                /* X */ - (wallThickness / 2) - (tableSIZEX / 2),
                /* Z */ 0,
                /* SIZE X */ wallThickness,
                /* SIZE Z */ tableSIZEZ
            ),
            new FieldLimit(
                /* X */ (wallThickness / 2) + (tableSIZEX / 2),
                /* Z */ 0,
                /* SIZE X */ wallThickness,
                /* SIZE Z */ tableSIZEZ
            ),
            new FieldLimit(
                /* X */ 0,
                /* Z */ - (wallThickness / 2) - (tableSIZEZ / 2),
                /* SIZE X */ tableSIZEX,
                /* SIZE Z */ wallThickness
            ),
            new FieldLimit(
                /* X */ 0,
                /* Z */ (wallThickness / 2) + (tableSIZEZ / 2),
                /* SIZE X */ tableSIZEX,
                /* SIZE Z */ wallThickness
            )
        ];
    }

    createCheerios() {
        let k = this.OUTSIDE_MARGIN + this.SIZE;
        let fieldLength = this.tableSize.x - 2*k;
        let fieldWidth = this.tableSize.z - 2*k;

        let n = 40;
        for (let x = -fieldLength / 2; x <= (fieldLength / 2) + (fieldLength / n); x += fieldLength / n) {
            this.cheerios.push(new Cheerio(x, 0, fieldWidth / 2, this.SIZE, this.RADIUS));
            this.cheerios.push(new Cheerio(x, 0, -fieldWidth / 2, this.SIZE, this.RADIUS));
        }

        n = 18;
        for (let z = - (fieldWidth / 2) + (fieldWidth / n); z <= (fieldWidth / 2) - (fieldWidth / n); z += fieldWidth / n) {
            this.cheerios.push(new Cheerio(fieldLength / 2, 0, z, this.SIZE, this.RADIUS));
            this.cheerios.push(new Cheerio(-fieldLength / 2, 0, z, this.SIZE, this.RADIUS));
        }

        k = this.INSIDE_MARGIN + this.SIZE;
        fieldLength = this.tableSize.x - 2*k;
        fieldWidth = this.tableSize.z - 2*k;

        n = 30;
        for (let x = -fieldLength / 2; x <= fieldLength / 2; x += fieldLength / n) {
            this.cheerios.push(new Cheerio(x, 0, fieldWidth / 2, this.SIZE, this.RADIUS));
            this.cheerios.push(new Cheerio(x, 0, -fieldWidth / 2, this.SIZE, this.RADIUS));
        }

        n = 8;
        for (let z = - (fieldWidth / 2) + (fieldWidth / n); z <= (fieldWidth / 2) - (fieldWidth / n); z += fieldWidth / n) {
            this.cheerios.push(new Cheerio(fieldLength / 2, 0, z, this.SIZE, this.RADIUS));
            this.cheerios.push(new Cheerio(-fieldLength / 2, 0, z, this.SIZE, this.RADIUS));
        }
    }

    placeCheerios() {
        let k = this.OUTSIDE_MARGIN + this.SIZE;
        let fieldLength = this.tableSize.x - 2*k;
        let fieldWidth = this.tableSize.z - 2*k;
        let i = 0;

        let n = 40;
        for (let x = -fieldLength / 2; x <= (fieldLength / 2) + (fieldLength / n); x += fieldLength / n) {
            this.cheerios[i].position.set(x, 0, fieldWidth / 2, this.SIZE, this.RADIUS);
            this.cheerios[i].stop();
            i++;
            this.cheerios[i].position.set(x, 0, -fieldWidth / 2, this.SIZE, this.RADIUS);
            this.cheerios[i].stop();
            i++;
        }

        n = 18;
        for (let z = - (fieldWidth / 2) + (fieldWidth / n); z <= (fieldWidth / 2) - (fieldWidth / n); z += fieldWidth / n) {
            this.cheerios[i].position.set(fieldLength / 2, 0, z, this.SIZE, this.RADIUS);
            this.cheerios[i].stop();
            i++;
            this.cheerios[i].position.set(-fieldLength / 2, 0, z, this.SIZE, this.RADIUS);
            this.cheerios[i].stop();
            i++;
        }

        k = this.INSIDE_MARGIN + this.SIZE;
        fieldLength = this.tableSize.x - 2*k;
        fieldWidth = this.tableSize.z - 2*k;

        n = 30;
        for (let x = -fieldLength / 2; x <= fieldLength / 2; x += fieldLength / n) {
            this.cheerios[i].position.set(x, 0, fieldWidth / 2, this.SIZE, this.RADIUS);
            this.cheerios[i].stop();
            i++;
            this.cheerios[i].position.set(x, 0, -fieldWidth / 2, this.SIZE, this.RADIUS);
            this.cheerios[i].stop();
            i++;
        }

        n = 8;
        for (let z = - (fieldWidth / 2) + (fieldWidth / n); z <= (fieldWidth / 2) - (fieldWidth / n); z += fieldWidth / n) {
            this.cheerios[i].position.set(fieldLength / 2, 0, z, this.SIZE, this.RADIUS);
            this.cheerios[i].stop();
            i++;
            this.cheerios[i].position.set(-fieldLength / 2, 0, z, this.SIZE, this.RADIUS);
            this.cheerios[i].stop();
            i++;
        }
    }
}
