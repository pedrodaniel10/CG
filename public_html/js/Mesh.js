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
}
