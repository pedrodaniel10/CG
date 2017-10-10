class Cheerio extends Object3D {
  constructor(x, y, z, size, radius) {
      super();
      this.cheerioBody = new CheerioBody(0, 0, 0, size, radius);

      this.add(this.cheerioBody);
      this.position.set(x, y, z);
  }
}
