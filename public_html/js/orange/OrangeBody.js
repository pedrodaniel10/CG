'use strict';

class OrangeBody extends Mesh {
    constructor(x, y, z) {
        super(x, y, z);
        this.ORANGE_RADIUS = ORANGE_RADIUS;
        //this.geometry = new THREE.SphereGeometry(this.ORANGE_RADIUS, 16, 16);
        this.geometry = this.doGeometry();
        this.material = new THREE.MeshLambertMaterial({ color: 0xff8c00, wireframe: true});
    }

    doGeometry() {
        var radius = this.ORANGE_RADIUS;

		var widthSegments = 16;
		var heightSegments = 16;

		var index = 0;
		var grid = [];


		var normal = new THREE.Vector3();

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

        var geometry = new THREE.Geometry();

		// generate vertices, normals and uvs

		for (let iy = 0; iy <= heightSegments; iy ++ ) {
			var verticesRow = [];
			var v = iy / heightSegments;

			for (let ix = 0; ix <= widthSegments; ix ++ ) {
				let u = ix / widthSegments;

				// vertex
                let vertex = new THREE.Vector3();

				vertex.x = -radius * Math.cos(u * 2 * Math.PI) * Math.sin(v * Math.PI);
				vertex.y = radius * Math.cos(v * Math.PI);
				vertex.z = radius * Math.sin(u * 2 * Math.PI) * Math.sin(v * Math.PI);

				//vertices.push(vertex.x, vertex.y, vertex.z);
                geometry.vertices.push(vertex);

				// normal
				normal.set(vertex.x, vertex.y, vertex.z).normalize();
				normals.push(normal.x, normal.y, normal.z);

				// uv
				uvs.push(u, 1 - v);

				verticesRow.push(index++);

			}

			grid.push(verticesRow);

		}

		// indices

		for (let iy = 0; iy < heightSegments; iy ++) {
			for (let ix = 0; ix < widthSegments; ix ++) {
				var a = grid[ iy ][ ix + 1 ];
				var b = grid[ iy ][ ix ];
				var c = grid[ iy + 1 ][ ix ];
				var d = grid[ iy + 1 ][ ix + 1 ];

				if (iy !== 0) indices.push(a, b, d);
				if (iy !== heightSegments-1) indices.push(b, c, d);
			}
		}

		// build geometry

		//geometry.setIndex( indices );
		//geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
		//geometry.addAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
		//geometry.addAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );

        return geometry;
    }
}
