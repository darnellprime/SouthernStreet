export function playIntroScene() {
  const intro = document.getElementById("intro-scene");

  intro.style.opacity = "1";

  setTimeout(() => {
    intro.style.opacity = "0";
  }, 6000);
}