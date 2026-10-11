import './style.css'

import * as THREE from 'three';

// Create the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(5, 5, 8);
camera.lookAt(0, 0, 0);

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Create geometry and materials
const geometry = new THREE.BoxGeometry(2, 3, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
const building = new THREE.Mesh(geometry, material);

//  Create the ground
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);

// Rotate the ground to be horizontal
ground.rotation.x = Math.PI / 2;
ground.position.y = -1.5; // Position the ground below the building

//Add objects to the scene
scene.add(building);
scene.add(ground);

//Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);

animate();