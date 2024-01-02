class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    function isTouchDevice() {
      return "ontouchstart" in window || navigator.maxTouchPoints;
    }

    this.view.startButton.addEventListener("click", (e) => {
      this.startHandler(e);
    });
    this.view.stopButton.addEventListener("click", (e) => {
      this.stopHandler(e);
    });
    this.view.inputFileElement.addEventListener("input", (e) => {
      this.inputFileHandler(e);
    });

    document.querySelectorAll('[name="output-size"]').forEach((radio) => {
      radio.addEventListener("click", (e) => {
        this.outputSizeHandler(e);
      });
    });

    if (!isTouchDevice()) {
      window.addEventListener("click", (e) => {
        this.appClickHandler(e);
      });
      window.addEventListener("mousemove", (e) => {
        this.appMoveHandler(e);
      });
      return;
    }

    window.addEventListener("touchstart", (e) => {
      this.appClickHandler(e);
    });
    window.addEventListener("touchmove", (e) => {
      this.appMoveHandler(e);
    });
  }

  outputSizeHandler(e) {
    const type = e.currentTarget.dataset.type;

    if (type === "cover") {
      return this.view.setOutputSize("cover");
    }

    this.view.setOutputSize("contain");
  }

  appClickHandler(e) {
    if (!this.model.isStarted) return;
    this.view.render("bonk", true);
    this.view.render("bonked", true);

    this.view.runAfter(100, () => {
      this.model.updateCounter();
      this.view.setCounter(this.model.counter);
      this.view.playBonkAudio();
      this.view.render("bonk", false);
    });
  }

  appMoveHandler(e) {
    if (!this.model.isStarted) return;
    this.view.setPointer(e.clientX, e.clientY);
  }

  startHandler(e) {
    if (!this.view.isFileSelected()) return;

    this.view.render("pointer", true);
    this.view.render("menu", false);
    this.view.render("bonk-section", true);

    this.view.runAfter(100, () => {
      this.model.started = true;
    });

    if (this.model.type !== "image") {
      this.view.bonkOnVideoOutputElement.play();
    }
  }

  stopHandler(e) {
    if (this.model.type !== "image") {
      this.view.bonkOnVideoOutputElement.pause();
    }

    this.model.started = false;
    this.model.type = "";
    this.view.resetOutput();
    this.view.inputFileElement.value = "";
    this.view.render("pointer", false);
    this.view.render("menu", true);
    this.view.render("bonk-section", false);

    this.model.resetCounter();
    this.view.setCounter(1);
  }

  inputFileHandler(e) {
    const file = e.target.files[0];
    const type = file.type.split("/")[0];

    if (type === "image") {
      this.view.bonkOnImageOutputElement.src = URL.createObjectURL(file);
      this.model.type = "image";
      return;
    }

    this.view.bonkOnVideoOutputElement.src = URL.createObjectURL(file);
    this.model.type = "video";
  }
}

export default Controller;
