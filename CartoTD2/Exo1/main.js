import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


        const scene = new THREE.Scene();
        {
            const color = 0xFFFFFF; 
            const near = 1;  
            
            const far = 100;
            scene.fog = new THREE.FogExp2(color, 0.22);
        }
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry( 1, 1, 2 );
        const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
        
        function makeInstance(geometry, color, x) {
            const material = new THREE.MeshPhongMaterial({color});
            
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            
            cube.position.x = x;
            
            return cube;
        }
        const loader = new GLTFLoader();

        loader.load( 'path/to/model.glb', function ( gltf ) {

        scene.add( gltf.scene );

        }, undefined, function ( error ) {

        console.error( error );

        } );
        
        const cubes = [makeInstance(geometry, 0x00ff00, 0), makeInstance(geometry, 0xffff00, -4), makeInstance(geometry, 0xff00ff, 4)];
        scene.add(...cubes);

        camera.position.z = 5;
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(1, 1, 3);
        scene.add(light);
        
        function animate( time ) {
            time *= 0.001;
            cubes.forEach((cube, ndx) => {
                const speed = 1 + ndx * .1;
                const rot = time * speed;
                cube.rotation.x = rot;
                cube.rotation.y = rot;
            }); 
            renderer.render( scene, camera );
        }
        renderer.setAnimationLoop( animate );