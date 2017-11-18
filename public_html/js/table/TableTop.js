'use strict';

class TableTop extends Mesh {
    constructor(x, y, z, sx, sy, sz) {
        super(x, y - (sy / 2), z);

        this.texturePath = "textures/tablecloth_blue.jpg";
        this.texture = new THREE.TextureLoader().load(this.texturePath);
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set( 15, 10 );

        this.geometry = new THREE.CubeGeometry(sx, sy, sz, 30, 1, 15);
        this.material = new THREE.MeshLambertMaterial({ color: 0xc4f6ff, emissive: this.emissive, map: this.texture, wireframe: true});

    }

    toGouraud() {
        this.material = new THREE.MeshLambertMaterial({ color: this.material.color, emissive: this.emissive,  map: this.texture, wireframe: this.material.wireframe});
    }

    toPhong() {
        this.material = new THREE.MeshPhongMaterial({ color: this.material.color, emissive: this.emissive, reflectivity: this.specualar, shininess: this.shininess,  map: this.texture, wireframe: this.material.wireframe});
    }

    toBasic() {
        this.material = new THREE.MeshBasicMaterial({ color: this.material.color,  map: this.texture, wireframe: this.material.wireframe});
    }
}
