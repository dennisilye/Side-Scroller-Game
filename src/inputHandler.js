export class InputHandler {
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
