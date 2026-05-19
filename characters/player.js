export function loadProtagonist(scene) {
  const loader = new THREE.GLTFLoader();

  loader.load('./assets/protagonist.glb', (gltf) => {

    const player = gltf.scene;

    player.scale.set(1, 1, 1);

    player.position.set(0, 0, 0);

    player.name = "protagonist";

    scene.add(player);

  });
}