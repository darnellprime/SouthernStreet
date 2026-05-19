export function showDialogue(text) {
  const box = document.createElement("div");

  box.className = "dialogue-box";
  box.innerText = text;

  document.body.appendChild(box);

  setTimeout(() => {
    box.remove();
  }, 4000);
}