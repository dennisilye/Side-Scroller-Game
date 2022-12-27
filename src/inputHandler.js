export class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (event) => {
      if (
        this._checkIfArrowKey(event.key) &&
        this.keys.indexOf(event.key) === -1
      ) {
        this.keys.push(event.key);
      }
    });

    window.addEventListener("keyup", (event) => {
      if (this._checkIfArrowKey(event.key)) {
        this.keys.splice(this.keys.indexOf(event.key, 1));
      }
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
