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

//  Window Resize listener
window.addEventListener('resize', onWindowResize);
function onWindowResize() {

    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;

    // Update camera projection based off new ratio
    camera.updateProjectionMatrix();

    // Update renderer size of browser window
    renderer.setSize(window.innerWidth, window.innerHeight);

}

//  Raycasting - allows us to detect where the mouse is pointing in 3D space
const raycaster = new THREE.Raycaster(); //  detecting intersections with 3D objects
const mouse = new THREE.Vector2(); //  stores mouse position on screen

renderer.domElement.addEventListener('click', onMouseClick);

function onMouseClick(event) {
    console.log("Mouse click detected");

    // Convert mouse coordinates from browser to threejs coordinates
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Create ray from camera through mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check if ray intersects building
    const intersects = raycaster.intersectObject(building);

    if (intersects.length > 0) {
        infoPanel.style.display = 'block'; // Show the info panel
    }

}


// Create geometry and materials
// const geometry = new THREE.BoxGeometry(2, 3, 2);
// const material = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
// const building = new THREE.Mesh(geometry, material);

// Historical Ward One building
const historicalGeometry = new THREE.BoxGeometry(2, 3, 2);

const historicalMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513
});

// Modern Columbia building
const modernGeometry = new THREE.BoxGeometry(3, 5, 3);

const modernMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080
});

// //  when we call the building variable, it will be the modern Columbia building
const building = new THREE.Mesh(modernGeometry, modernMaterial); 
building.position.y = 1;
//building.id = 'building'; //  assign an id to the building for css

//  flag to track which building is currently displayed
//  false = modern cola, true = historical ward one
//  let allows for constant reassignment of the variable, but not redeclaration
let isHistorical = false; 

function transformBuilding(historical) {

    isHistorical = historical; //  option will tell which building to display

    if (isHistorical) {
        building.geometry = historicalGeometry;
        building.material = historicalMaterial;
        building.position.y = 0;
    } else {
        building.geometry = modernGeometry;
        building.material = modernMaterial;
        building.position.y = 1;
    }
}

// Transformation button
const transformButton = document.createElement('button');

transformButton.id = 'transform-button';

transformButton.textContent = 'View Historical Ward One';

document.body.appendChild(transformButton);

transformButton.addEventListener('click', () => {

    // Switch to the opposite state
    transformBuilding(!isHistorical);

    // Update dropdown to match current state
    yearSelector.value = isHistorical ? 'historical' : 'modern';

    // Update button text
    transformButton.textContent = isHistorical
        ? 'View Modern Columbia'
        : 'View Historical Ward One';

});

// Historical year selector
const yearSelector = document.createElement('select');

yearSelector.id = 'year-selector';

yearSelector.innerHTML = `
    <option value="modern">2026 - Modern Columbia</option>
    <option value="historical">1950 - Historical Ward One</option>
`;

document.body.appendChild(yearSelector);

yearSelector.addEventListener('change', () => {

    const selectedYear = yearSelector.value;

    if (selectedYear === 'historical') {
        transformBuilding(true);
    } else {
        transformBuilding(false);
    }

    // Update transformation button text
    transformButton.textContent = isHistorical
        ? 'View Modern Columbia'
        : 'View Historical Ward One';

});


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