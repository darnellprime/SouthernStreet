// ======================================================
// SOUTHERN STREET STORIES — MAIN GAME ENGINE
// FULL THIRD PERSON GTA-STYLE SYSTEM
// ======================================================

import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

import { GLTFLoader }
from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

import { playIntroScene }
from './story.js';

import { startWeatherSystem }
from './systems/weather.js';

import { startMissionSystem }
from './systems/missions.js';


// ======================================================
// SCENE
// ======================================================

const scene = new THREE.Scene();

scene.background =
  new THREE.Color(0x4a3b2a);

scene.fog =
  new THREE.Fog(
    0x1f1b18,
    20,
    120
  );


// ======================================================
// CAMERA
// ======================================================

const camera =
  new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

camera.position.set(0, 3, 7);


// ======================================================
// RENDERER
// ======================================================

const renderer =
  new THREE.WebGLRenderer({
    antialias: true
  });

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.shadowMap.enabled = true;

document.body.appendChild(
  renderer.domElement
);


// ======================================================
// LIGHTING
// ======================================================

const sunsetLight =
  new THREE.DirectionalLight(
    0xffa95c,
    2
  );

sunsetLight.position.set(
  15,
  25,
  10
);

sunsetLight.castShadow = true;

scene.add(sunsetLight);


const ambient =
  new THREE.AmbientLight(
    0xffd6a3,
    0.8
);

scene.add(ambient);


// ======================================================
// GROUND
// ======================================================

const ground =
  new THREE.Mesh(

    new THREE.PlaneGeometry(
      300,
      300
    ),

    new THREE.MeshStandardMaterial({
      color: 0x2e2a26
    })

  );

ground.rotation.x =
  -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


// ======================================================
// REDWATER ROAD
// ======================================================

const road =
  new THREE.Mesh(

    new THREE.PlaneGeometry(
      12,
      300
    ),

    new THREE.MeshStandardMaterial({
      color: 0x1a1a1a
    })

  );

road.rotation.x =
  -Math.PI / 2;

road.position.y = 0.01;

scene.add(road);


// ======================================================
// PLAYER
// ======================================================

let player;

const loader =
  new GLTFLoader();

loader.load(

  './assets/protagonist.glb',

  (gltf) => {

    player =
      gltf.scene;

    player.scale.set(
      1.3,
      1.3,
      1.3
    );

    player.position.set(
      0,
      0,
      0
    );

    player.traverse((obj) => {

      if (obj.isMesh) {

        obj.castShadow = true;

      }

    });

    scene.add(player);

  }

);


// ======================================================
// THIRD PERSON CAMERA
// ======================================================

const cameraOffset =
  new THREE.Vector3(
    0,
    3,
    -6
  );

function updateCamera() {

  if (!player) return;

  const offset =
    cameraOffset.clone();

  offset.applyQuaternion(
    player.quaternion
  );

  camera.position.lerp(

    player.position.clone().add(offset),

    0.08

  );

  camera.lookAt(
    player.position.x,
    player.position.y + 2,
    player.position.z
  );

}


// ======================================================
// PLAYER MOVEMENT
// ======================================================

const keys = {};

document.addEventListener(
  'keydown',
  (e) => keys[e.key.toLowerCase()] = true
);

document.addEventListener(
  'keyup',
  (e) => keys[e.key.toLowerCase()] = false
);


function updatePlayer() {

  if (!player) return;

  const speed = 0.12;

  // FORWARD
  if (keys['w']) {

    player.position.z -= speed;

  }

  // BACKWARD
  if (keys['s']) {

    player.position.z += speed;

  }

  // LEFT
  if (keys['a']) {

    player.position.x -= speed;

    player.rotation.y = Math.PI / 2;

  }

  // RIGHT
  if (keys['d']) {

    player.position.x += speed;

    player.rotation.y = -Math.PI / 2;

  }

}


// ======================================================
// CITY LIGHTS
// ======================================================

for (let i = 0; i < 40; i++) {

  const pole =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.08,
        0.08,
        6
      ),

      new THREE.MeshStandardMaterial({
        color: 0x444444
      })

    );

  pole.position.set(
    (Math.random() > 0.5 ? -8 : 8),
    3,
    (Math.random() - 0.5) * 250
  );

  scene.add(pole);


  const bulb =
    new THREE.PointLight(
      0xffb347,
      2,
      20
    );

  bulb.position.set(
    pole.position.x,
    6,
    pole.position.z
  );

  scene.add(bulb);

}


// ======================================================
// ATMOSPHERIC FOG PARTICLES
// ======================================================

const fogGeometry =
  new THREE.BufferGeometry();

const fogVertices = [];

for (let i = 0; i < 2500; i++) {

  fogVertices.push(
    (Math.random() - 0.5) * 300
  );

  fogVertices.push(
    Math.random() * 20
  );

  fogVertices.push(
    (Math.random() - 0.5) * 300
  );

}

fogGeometry.setAttribute(

  'position',

  new THREE.Float32BufferAttribute(
    fogVertices,
    3
  )

);

const fogMaterial =
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08,
    transparent: true,
    opacity: 0.15
  });

const fogParticles =
  new THREE.Points(
    fogGeometry,
    fogMaterial
  );

scene.add(fogParticles);


// ======================================================
// SIMPLE BUILDINGS
// ======================================================

for (let i = 0; i < 35; i++) {

  const building =
    new THREE.Mesh(

      new THREE.BoxGeometry(

        Math.random() * 6 + 4,
        Math.random() * 10 + 5,
        Math.random() * 6 + 4

      ),

      new THREE.MeshStandardMaterial({
        color: 0x3a312d
      })

    );

  building.position.set(

    (Math.random() > 0.5 ? -18 : 18),

    4,

    (Math.random() - 0.5) * 250

  );

  scene.add(building);

}


// ======================================================
// GAME SYSTEMS
// ======================================================

window.addEventListener(

  'DOMContentLoaded',

  () => {

    // LOADING SCREEN

    setTimeout(() => {

      document.getElementById(
        'loading-screen'
      ).style.display = 'none';

    }, 3000);


    // INTRO SCENE

    setTimeout(() => {

      playIntroScene();

    }, 4000);


    // WEATHER

    startWeatherSystem();


    // MISSIONS

    startMissionSystem();

  }

);


// ======================================================
// RESIZE
// ======================================================

window.addEventListener(

  'resize',

  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }

);


// ======================================================
// GAME LOOP
// ======================================================

function animate() {

  requestAnimationFrame(
    animate
  );

  updatePlayer();

  updateCamera();

  fogParticles.rotation.y += 0.0005;

  renderer.render(
    scene,
    camera
  );

}

animate();