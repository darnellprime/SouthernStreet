const game = {
  player: {
    x: 100,
    y: 100,
    speed: 3,
    health: 100,
    state: "free" // free, mission, cutscene
  },

  keys: {},

  init() {
    this.bindKeys();
    this.loop();
  },

  bindKeys() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  },

  update() {
    if (this.player.state !== "free") return;

    if (this.keys["w"]) this.player.y -= this.player.speed;
    if (this.keys["s"]) this.player.y += this.player.speed;
    if (this.keys["a"]) this.player.x -= this.player.speed;
    if (this.keys["d"]) this.player.x += this.player.speed;

    this.renderPlayer();
  },

  renderPlayer() {
    const el = document.getElementById("player");

    if (!el) return;

    el.style.left = this.player.x + "px";
    el.style.top = this.player.y + "px";
  },

  loop() {
    this.update();
    requestAnimationFrame(() => this.loop());
  }
};

window.onload = () => game.init();