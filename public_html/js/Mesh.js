class Mesh extends THREE.Mesh {
    constructor(x, y, z) {
        super();
        this.position.set(x, y, z);
        this.axisHelper = new THREE.AxisHelper(100);
        this.geometry = new THREE.Geometry();
    }

    addVertex(x, y, z) {
        if (x instanceof THREE.Vector3) {
            this.geometry.vertices.push(x);
        }
        else {
            this.geometry.vertices.push(new THREE.Vector3(x, y, z));
        }
    }

    addFace(a, b, c, normal, color, materialIndex) {
        this.geometry.faces.push(new THREE.Face3(a, b, c, normal, color, materialIndex));
    }

    addVertexCircunference(x, y, z, r, n) {
        /* Creates a "circle" of n vertices around x, y, z
          with radius r on the XY plane. */
        for (let theta = 0; theta < 2 * Math.PI; theta += (2 * Math.PI) / n) {
            this.addVertex(x + (r * Math.cos(theta)), y + (r * Math.sin(theta)), z);
        }
    }

    connectCircToCenter(center, n, d) {
        /* Creates faces connecting the last circunference
         defined (of n vertices) to a center point, with the faces
         oriented towards d in Z (positive or negative). */
        var startV = this.geometry.vertices.length - n;
        var endV = this.geometry.vertices.length - 1;

        for (let v = startV; v < endV; v++) {
            if (d < 0)
                this.addFace(center, v+1, v);
            else
                this.addFace(center, v, v+1);
        }

        if (d < 0)
            this.addFace(center, startV, endV);
        else
            this.addFace(center, endV, startV);
    }

    connectCircunferences(n) {
        /* Creates faces connecting the last two circunferences
         defined (of n vertices, with increasing Z) to each other. */
        var startV2 = this.geometry.vertices.length - n;
        var endV2 = this.geometry.vertices.length - 1;

        for (let v2 = startV2; v2 < endV2; v2++) {
            let v1 = v2 - n; // v1.z < v2.z

            this.addFace(v1, v1+1, v2);
            this.addFace(v1+1, v2+1, v2);
        }

        let startV1 = startV2 - n;
        let endV1 = endV2 - n;
        this.addFace(startV1, startV2, endV2);
        this.addFace(startV1, endV2, endV1);
    }

    setAxisOn() {
      this.add(this.axisHelper);
    }

    setAxisOff() {
      this.remove(this.axisHelper);
    }

    update() {
    }

    toGouraud() {
        this.material = new THREE.MeshLambertMaterial({ color: this.material.color, wireframe: this.material.wireframe});
    }

    toPhong() {
        this.material = new THREE.MeshPhongMaterial({ color: this.material.color, wireframe: this.material.wireframe});
    }

    toBasic() {
        this.material = new THREE.MeshBasicMaterial({ color: this.material.color, wireframe: this.material.wireframe});
    }
}
