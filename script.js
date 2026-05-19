// ======================================================
// SOUTHERN STREET STORIES
// FULL GTA-STYLE OPEN WORLD ENGINE
// ======================================================


// ======================================================
// IMPORTS
// ======================================================

import * as THREE
from 'https://cdn.skypack.dev/three@0.152.2';

import { GLTFLoader }
from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

import { playIntroScene }
from './story.js';

import { startWeatherSystem }
from './systems/weather.js';

import { startMissionSystem }
from './systems/missions.js';

import { spawnTraffic }
from './systems/vehicles.js';

import { spawnNPCs }
from './systems/npcs.js';

import { startDayNight }
from './systems/daynight.js';


// ======================================================
// SCENE
// ======================================================

const scene =
  new THREE.Scene();

scene.background =
  new THREE.Color(0x4a3b2a);

scene.fog =
  new THREE.Fog(
    0x1f1b18,
    20,
    180
  );


// ======================================================
// CAMERA
// ======================================================

const camera =
  new THREE.PerspectiveCamera(

    75,

    window.innerWidth /
    window.innerHeight,

    0.1,

    1000

  );

camera.position.set(
  0,
  3,
  8
);


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

renderer.outputEncoding =
  THREE.sRGBEncoding;

document.body.appendChild(
  renderer.domElement
);


// ======================================================
// LIGHTING
// ======================================================

const sunsetLight =
  new THREE.DirectionalLight(

    0xffa95c,

    2.2

  );

sunsetLight.position.set(
  20,
  30,
  10
);

sunsetLight.castShadow = true;

scene.add(sunsetLight);


const ambient =
  new THREE.AmbientLight(

    0xffd6a3,

    0.9

  );

scene.add(ambient);


// ======================================================
// GROUND
// ======================================================

const ground =
  new THREE.Mesh(

    new THREE.PlaneGeometry(
      500,
      500
    ),

    new THREE.MeshStandardMaterial({

      color: 0x26221f

    })

  );

ground.rotation.x =
  -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


// ======================================================
// ROAD
// ======================================================

const road =
  new THREE.Mesh(

    new THREE.PlaneGeometry(
      16,
      500
    ),

    new THREE.MeshStandardMaterial({

      color: 0x121212

    })

  );

road.rotation.x =
  -Math.PI / 2;

road.position.y = 0.02;

scene.add(road);


// ======================================================
// ROAD LINES
// ======================================================

for (let i = -240; i < 240; i += 12) {

  const line =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.4,
        0.02,
        6
      ),

      new THREE.MeshStandardMaterial({

        color: 0xffc400

      })

    );

  line.position.set(
    0,
    0.03,
    i
  );

  scene.add(line);

}


// ======================================================
// PLAYER MODEL
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
      1.4,
      1.4,
      1.4
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

  },

  undefined,

  (error) => {

    console.error(
      'MODEL FAILED TO LOAD:',
      error
    );

  }

);


// ======================================================
// THIRD PERSON CAMERA
// ======================================================

const cameraOffset =
  new THREE.Vector3(
    0,
    3,
    -7
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
// PLAYER CONTROLS
// ======================================================

const keys = {};

document.addEventListener(

  'keydown',

  (e) => {

    keys[e.key.toLowerCase()] = true;

  }

);

document.addEventListener(

  'keyup',

  (e) => {

    keys[e.key.toLowerCase()] = false;

  }

);


function updatePlayer() {

  if (!player) return;

  const speed = 0.14;

  // FORWARD

  if (keys['w']) {

    player.position.z -= speed;

    player.rotation.y = 0;

  }

  // BACKWARD

  if (keys['s']) {

    player.position.z += speed;

    player.rotation.y = Math.PI;

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
// BUILDINGS
// ======================================================

for (let i = 0; i < 65; i++) {

  const building =
    new THREE.Mesh(

      new THREE.BoxGeometry(

        Math.random() * 8 + 5,

        Math.random() * 18 + 8,

        Math.random() * 8 + 5

      ),

      new THREE.MeshStandardMaterial({

        color:
          Math.random() > 0.5
          ? 0x302823
          : 0x3a312d

      })

    );

  building.position.set(

    (Math.random() > 0.5 ? -24 : 24),

    building.geometry.parameters.height / 2,

    (Math.random() - 0.5) * 450

  );

  building.castShadow = true;

  building.receiveShadow = true;

  scene.add(building);

}


// ======================================================
// STREET LIGHTS
// ======================================================

for (let i = -240; i < 240; i += 20) {

  const pole =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.08,
        0.08,
        8
      ),

      new THREE.MeshStandardMaterial({

        color: 0x444444

      })

    );

  pole.position.set(
    -10,
    4,
    i
  );

  scene.add(pole);


  const light =
    new THREE.PointLight(

      0xffb347,

      1.8,

      25

    );

  light.position.set(
    -10,
    8,
    i
  );

  scene.add(light);

}


// ======================================================
// ATMOSPHERIC FOG PARTICLES
// ======================================================

const fogGeometry =
  new THREE.BufferGeometry();

const fogVertices = [];

for (let i = 0; i < 3500; i++) {

  fogVertices.push(
    (Math.random() - 0.5) * 500
  );

  fogVertices.push(
    Math.random() * 20
  );

  fogVertices.push(
    (Math.random() - 0.5) * 500
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
// NPCS
// ======================================================

spawnNPCs(scene);


// ======================================================
// TRAFFIC
// ======================================================

spawnTraffic(scene);


// ======================================================
// DAY NIGHT SYSTEM
// ======================================================

startDayNight(scene);


// ======================================================
// WEATHER
// ======================================================

startWeatherSystem();


// ======================================================
// MISSIONS
// ======================================================

startMissionSystem();


// ======================================================
// LOADING SCREEN
// ======================================================

const loadingBar =
  document.getElementById(
    'loading-bar'
  );

let progress = 0;

const loading =
  setInterval(() => {

    progress +=
      Math.random() * 6;

    loadingBar.style.width =
      progress + '%';

    if (progress >= 100) {

      clearInterval(loading);

      setTimeout(() => {

        document.getElementById(
          'loading-screen'
        ).style.display = 'none';

      }, 1500);

    }

  }, 400);


// ======================================================
// STORY INTRO
// ======================================================

setTimeout(() => {

  playIntroScene();

}, 8000);


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

  fogParticles.rotation.y +=
    0.0003;

  renderer.render(
    scene,
    camera
  );

}

animate();