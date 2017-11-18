'use strict';

class InterruptionScreen extends Object3D {
  constructor(x, y, z) {
    super(x, y, z);

    this.texturePath = "textures/pause.png";
    this.texture = new THREE.TextureLoader().load(this.texturePath);

    this.geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    this.material = new THREE.MeshBasicMaterial({ color: 0xc4f6ff,  map: this.texture, wireframe: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }
}