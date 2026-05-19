export function startDayNight(scene) {

  let t = 0;

  setInterval(() => {

    t += 0.002;

    const intensity =
      Math.sin(t) * 0.5 + 0.5;

    scene.background.setRGB(

      0.15 * intensity,

      0.12 * intensity,

      0.1 * intensity

    );

  }, 100);

}