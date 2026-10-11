import './style.css'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
//  renderer.domElement html that recivies the mouse interactions
document.body.appendChild(renderer.domElement);

// Camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // makes it smoother, camera slows down when you stop moving the mouse
controls.dampingFactor = 0.05; // controls how much the camera slows down when you stop moving the mouse
controls.maxPolarAngle = Math.PI / 2; // Prevent the camera from going below the ground
controls.minDistance = 2; // Prevent the camera from getting too close to the building
controls.maxDistance = 20; // Prevent the camera from getting too far away from the building

//  Raycasting - allows us to detect where the mouse is pointing in 3D space
const raycaster = new THREE.Raycaster(); //  detecting intersections with 3D objects
const mouse = new THREE.Vector2(); //  stores mouse position on screen

window.addEventListener('click', onMouseClick);

function onMouseClick(event) {
    console.log("Mouse click detected");

    // Convert mouse coordinates from browser to threejs coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Create ray from camera through mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check if ray intersects building
    const intersects = raycaster.intersectObject(building);

    if (intersects.length > 0) {
        infoPanel.style.display = 'block'; // Show the info panel
    }

}


// Create geometry and materials
const geometry = new THREE.BoxGeometry(2, 3, 2);
const material = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
const building = new THREE.Mesh(geometry, material);

//  Create the ground
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);

// Rotate the ground to be horizontal
ground.rotation.x = Math.PI / 2;
ground.position.y = -1.5; // Position the ground below the building

//Add ambient lighting (color, intensity)
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-5, 5, 2); // Position the light to the left and above the building - each building is different


//Add objects to the scene
scene.add(building);
scene.add(ground);
scene.add(directionalLight);
scene.add(ambientLight);

//  Historical information panel
const infoPanel = document.createElement('div');

infoPanel.id = 'info-panel';

infoPanel.innerHTML = `
    <h2>Ward One</h2>
    <p>
        Ward One was a predominantly Black, working-class
        neighborhood in downtown Columbia, South Carolina.
    </p>
    <p>
        Much of the neighborhood was demolished during
        urban renewal and university expansion.
    </p>
    <button id="close-info">Close</button>
`;

document.body.appendChild(infoPanel);

document.getElementById('close-info').addEventListener('click', () => {
    infoPanel.style.display = 'none';
});

//Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update the controls for every frame
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);

animate();