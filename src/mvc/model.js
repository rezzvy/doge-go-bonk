class Model {
  constructor() {
    this.isStarted = false;
    this.bonkCounter = 1;
    this.inputType = "";
  }

  updateCounter() {
    this.bonkCounter++;
  }

  resetCounter() {
    this.bonkCounter = 1;
  }

  get type() {
    return this.inputType;
  }

  get counter() {
    return this.bonkCounter;
  }

  set type(value) {
    this.inputType = value;
  }

  set started(boolean) {
    this.isStarted = boolean;
  }
}

export default Model;
