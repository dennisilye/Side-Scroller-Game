import { Player } from "./src/player.js";
import { InputHandler } from "./src/inputHandler.js";
import { Background } from "./src/background.js";
import { Enemy } from "./src/enemy.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;
  let enemies = [];
  let score = 0;
  let isGameOver = false;

  function handleEnemies(deltaTime) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      enemies.push(new Enemy(canvas.width, canvas.height));
      randomEnemyInterval = Math.random() * 1000 + 500;
      enemyTimer = 0;
    } else {
      enemyTimer += deltaTime;
    }
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(deltaTime);
      if (enemy.markedForDeletion) score++;
    });
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion);
  }

  function displayStatusText(context) {
    context.fillStyle = "black";
    context.font = "40px Helvetica";
    context.fillText("Score: " + score, 20, 50);
    if (isGameOver) {
        context.textAlign = 'center'
        context.fillStyle = 'black'
        context.fillText('GAME OVER, try again!', canvas.width /2 , 200)
    }
  }

  function gameOver() {
    isGameOver = true;
  }

  function restartGame() {
    player.restart()
    enemies = [];
    score = 0;
    isGameOver = false;
    animate(0)
  } 

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height, gameOver);
  const background = new Background(canvas.width, canvas.height);

  let lastTime = 0;
  let enemyTimer = 0;
  let enemyInterval = 2000;
  let randomEnemyInterval = Math.random() * 1000 + 500;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();
    player.draw(ctx);
    player.update(input, deltaTime, enemies);
    handleEnemies(deltaTime);
    displayStatusText(ctx);
    if (!isGameOver) requestAnimationFrame(animate);
  }
  animate(0);
});
