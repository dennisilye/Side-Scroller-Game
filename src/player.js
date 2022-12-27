export class Player {
  constructor(gameWidth, gameHeight, gameOver) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 200;
    this.height = 200;
    this.x = 0;
    this.y = this.gameHeight;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 8;
    this.image = document.getElementById("playerImage");
    this.speed = 0;
    this.vy = 0;
    this.weight = 1;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.gameOver = gameOver;
  }

  draw(context) {
    context.strokeStyle = "white";
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  restart() {
    this.x = 100;
    this.y = this.gameHeight;
    this.maxFrame = 8
    this.frameY = 0
  }

  update(input, deltaTime, enemies) {
    enemies.forEach((enemy) => {
      const dx = enemy.x + enemy.width / 2 - (this.x + this.width / 2);
      const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < enemy.width / 2 + this.width / 2) {
        console.log("collision detected");
        this.gameOver();
      }
    });

    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    if (input.keys.indexOf("ArrowRight") !== -1) {
      this.speed = 5;
    } else if (input.keys.indexOf("ArrowLeft") !== -1) {
      this.speed = -5;
    } else if (input.keys.indexOf("ArrowUp") !== -1 && this._onGround()) {
      this.vy -= 32;
    } else {
      this.speed = 0;
    }
    this.x += this.speed;
    if (this.x < 0) this.x = 0;
    else if (this.x > this.gameWidth - this.width) {
      this.x = this.gameWidth - this.width;
    }

    this.y += this.vy;
    if (!this._onGround()) {
      this.vy += this.weight;
      this.maxFrame = 5;
    } else {
      this.vy = 0;
      this.maxFrame = 8;
    }

    if (this.y > this.gameHeight - this.height)
      this.y = this.gameHeight - this.height;
  }

  _onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}
