'use strict';

class Table extends Object3D {
    constructor() {
        super();
        this.SIZEX = 900;
        this.SIZEY = 20;
        this.SIZEZ = 400;
        this.tableTop = new TableTop(0, 0, 0, this.SIZEX, this.SIZEY, this.SIZEZ);

        this.add(this.tableTop);
        this.position.y -= this.SIZEY/2;
    }
}