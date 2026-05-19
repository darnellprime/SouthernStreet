import * as THREE
from 'https://cdn.skypack.dev/three@0.152.2';

export function spawnNPCs(scene) {

  for (let i = 0; i < 25; i++) {

    const npc =
      new THREE.Mesh(

        new THREE.CapsuleGeometry(
          0.4,
          1.2,
          4,
          8
        ),

        new THREE.MeshStandardMaterial({
          color: 0x222222
        })

      );

    npc.position.set(

      (Math.random() - 0.5) * 40,

      1,

      (Math.random() - 0.5) * 250

    );

    scene.add(npc);

  }

}