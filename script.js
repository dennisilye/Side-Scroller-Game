import { Player } from "./src/player.js";
import { InputHandler } from "./src/inputHandler.js";
import { Background } from "./src/background.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;

  class Enemy {}

  function handleEnemies() {}

  function displayStatusText() {}

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();
    player.draw(ctx);
    player.update(input);
    requestAnimationFrame(animate);
  }
  animate();
});
