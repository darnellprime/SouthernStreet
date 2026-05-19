import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';


// ======================================================
// SCENE
// ======================================================

const scene = new THREE.Scene();

scene.background =
  new THREE.Color(0x6a4a32);

scene.fog =
  new THREE.Fog(
    0x1a1614,
    20,
    150
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

camera.position.set(0, 6, 12);


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

const sun =
  new THREE.DirectionalLight(
    0xffb36b,
    2
  );

sun.position.set(
  20,
  30,
  10
);

sun.castShadow = true;

scene.add(sun);


const ambient =
  new THREE.AmbientLight(
    0xffddb0,
    1
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
      color: 0x3b322c
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
      14,
      500
    ),

    new THREE.MeshStandardMaterial({
      color: 0x111111
    })

  );

road.rotation.x =
  -Math.PI / 2;

road.position.y = 0.02;

scene.add(road);


// ======================================================
// ROAD LINES
// ======================================================

for (let i = -240; i < 240; i += 14) {

  const line =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.4,
        0.05,
        6
      ),

      new THREE.MeshStandardMaterial({
        color: 0xffc400
      })

    );

  line.position.set(
    0,
    0.04,
    i
  );

  scene.add(line);

}


// ======================================================
// BUILDINGS
// ======================================================

for (let i = 0; i < 70; i++) {

  const building =
    new THREE.Mesh(

      new THREE.BoxGeometry(

        Math.random() * 6 + 4,
        Math.random() * 20 + 6,
        Math.random() * 6 + 4

      ),

      new THREE.MeshStandardMaterial({

        color:
          Math.random() > 0.5
          ? 0x4a3b32
          : 0x352c28

      })

    );

  building.position.set(

    (Math.random() > 0.5 ? -22 : 22),

    building.geometry.parameters.height / 2,

    (Math.random() - 0.5) * 450

  );

  building.castShadow = true;

  building.receiveShadow = true;

  scene.add(building);

}


// ======================================================
// PLAYER
// ======================================================

const player =
  new THREE.Mesh(

    new THREE.CapsuleGeometry(
      0.7,
      1.8,
      4,
      8
    ),

    new THREE.MeshStandardMaterial({
      color: 0x2a2a2a
    })

  );

player.position.y = 1.5;

player.castShadow = true;

scene.add(player);


// ======================================================
// CAMERA SYSTEM
// ======================================================

const cameraOffset =
  new THREE.Vector3(
    0,
    5,
    10
  );

function updateCamera() {

  const target =
    player.position.clone().add(
      cameraOffset
    );

  camera.position.lerp(
    target,
    0.08
  );

  camera.lookAt(
    player.position
  );

}


// ======================================================
// CONTROLS
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

  const speed = 0.22;

  if (keys['w']) {

    player.position.z -= speed;

  }

  if (keys['s']) {

    player.position.z += speed;

  }

  if (keys['a']) {

    player.position.x -= speed;

  }

  if (keys['d']) {

    player.position.x += speed;

  }

}


// ======================================================
// NPCS
// ======================================================

for (let i = 0; i < 25; i++) {

  const npc =
    new THREE.Mesh(

      new THREE.CapsuleGeometry(
        0.5,
        1.5,
        4,
        8
      ),

      new THREE.MeshStandardMaterial({
        color: 0x444444
      })

    );

  npc.position.set(

    (Math.random() - 0.5) * 40,

    1.2,

    (Math.random() - 0.5) * 300

  );

  scene.add(npc);

}


// ======================================================
// CARS
// ======================================================

for (let i = 0; i < 20; i++) {

  const car =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        2,
        1,
        4
      ),

      new THREE.MeshStandardMaterial({

        color:
          Math.random() > 0.5
          ? 0x111111
          : 0x555555

      })

    );

  car.position.set(

    (Math.random() - 0.5) * 10,

    0.6,

    (Math.random() - 0.5) * 400

  );

  scene.add(car);

}


// ======================================================
// ATMOSPHERIC FOG PARTICLES
// ======================================================

const particles =
  new THREE.BufferGeometry();

const verts = [];

for (let i = 0; i < 4000; i++) {

  verts.push(
    (Math.random() - 0.5) * 500
  );

  verts.push(
    Math.random() * 20
  );

  verts.push(
    (Math.random() - 0.5) * 500
  );

}

particles.setAttribute(

  'position',

  new THREE.Float32BufferAttribute(
    verts,
    3
  )

);

const particleMaterial =
  new THREE.PointsMaterial({

    color: 0xffffff,

    size: 0.08,

    transparent: true,

    opacity: 0.15

  });

const fogParticles =
  new THREE.Points(
    particles,
    particleMaterial
  );

scene.add(fogParticles);


// ======================================================
// LOADING SCREEN
// ======================================================

const loadingScreen =
  document.getElementById(
    'loading-screen'
  );

setTimeout(() => {

  loadingScreen.style.display =
    'none';

}, 6000);


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
    0.0002;

  renderer.render(
    scene,
    camera
  );

}

animate();


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