import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Ground
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x3e5f3e
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Road
const roadGeometry = new THREE.PlaneGeometry(10, 200);
const roadMaterial = new THREE.MeshStandardMaterial({
  color: 0x222222
});

const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2;
road.position.y = 0.01;
scene.add(road);

// Player
const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshStandardMaterial({
  color: 0xff4444
});

const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 1;
scene.add(player);

// Simple Building Function
function createBuilding(x, z, color = 0x8b5a2b) {
  const geo = new THREE.BoxGeometry(4, 4, 4);
  const mat = new THREE.MeshStandardMaterial({ color });

  const building = new THREE.Mesh(geo, mat);

  building.position.set(x, 2, z);

  scene.add(building);
}

// Buildings
createBuilding(-10, -20);
createBuilding(12, -40);
createBuilding(-15, -70);
createBuilding(14, -100);
createBuilding(-12, -130);

// Camera Position
camera.position.set(0, 5, 10);

// Controls
const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

// Animate
function animate() {
  requestAnimationFrame(animate);

  const speed = 0.12;

  // Movement
  if (keys['w']) player.position.z -= speed;
  if (keys['s']) player.position.z += speed;
  if (keys['a']) player.position.x -= speed;
  if (keys['d']) player.position.x += speed;

  // Third Person Camera
  camera.position.x = player.position.x;
  camera.position.z = player.position.z + 10;
  camera.lookAt(player.position);

  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});