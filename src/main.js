import './style.css'

import * as THREE from 'three';

// 1. Create the scene
const scene = new THREE.Scene();

// 2. Set up the camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(5, 5, 8);
camera.lookAt(0, 0, 0);

// 3. Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 4. Create geometry and materials
const geometry = new THREE.BoxGeometry(2, 3, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
const building = new THREE.Mesh(geometry, material);

// 5. Add objects to the scene
scene.add(building);

// 6. Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);

animate();