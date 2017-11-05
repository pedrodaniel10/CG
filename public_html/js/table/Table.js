'use strict';
var TABLE_SIZEX = 900;
var TABLE_SIZEY = 20;
var TABLE_SIZEZ = 400;

class Table extends Object3D {
    constructor(x, y, z) {
        super(x, y, z);
        this.SIZEX = TABLE_SIZEX;
        this.SIZEY = TABLE_SIZEY;
        this.SIZEZ = TABLE_SIZEZ;
        this.tableTop = new TableTop(0, 0, 0, this.SIZEX, this.SIZEY, this.SIZEZ);
        this.meshList.push(this.tableTop);

        this.add(this.tableTop);
    }
}
