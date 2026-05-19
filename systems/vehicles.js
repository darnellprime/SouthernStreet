import * as THREE
from 'https://cdn.skypack.dev/three@0.152.2';

export function spawnTraffic(scene) {

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

      (Math.random() - 0.5) * 20,

      0.5,

      (Math.random() - 0.5) * 250

    );

    scene.add(car);

  }

}