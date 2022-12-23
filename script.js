window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;

  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener("keydown", (event) => {
        console.log("event", event.key);

        if (
          this._checkIfArrowKey(event.key) &&
          this.keys.indexOf(event.key) === -1
        ) {
          this.keys.push(event.key);
        }
        console.log(this.keys);
      });

      window.addEventListener("keyup", (event) => {
        console.log("event", event.key);

        if (this._checkIfArrowKey(event.key)) {
          this.keys.splice(this.keys.indexOf(event.key, 1));
        }
        console.log(this.keys);
      });
    }

    _checkIfArrowKey(key) {
      return (
        key === "ArrowDown" ||
        key === "ArrowUp" ||
        key === "ArrowLeft" ||
        key === "ArrowRight"
      );
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 0;
      this.y = this.width - this.height;
      this.frameX = 0
      this.frameY = 0
      this.image = document.getElementById("playerImage");
      this.speed = 0
    }

    draw(context) {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.image,this.frameX,this.frameY,this.width,this.height,this.x,this.y,this.width,this.height)
    }

    update(input) {
        this.x += this.speed
    }
  }

  class Background {}

  class Enemy {}

  function handleEnemies() {}

  function displayStatusText() {}

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    player.update(input);
    requestAnimationFrame(animate);
  }
  animate();
});
