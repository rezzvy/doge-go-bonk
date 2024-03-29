class View {
  constructor() {
    this.startButton = document.getElementById("start-bonk-btn");
    this.stopButton = document.getElementById("stop-btn");
    this.bonkCounterElement = document.querySelector("._counter");
    this.appMenuSection = document.getElementById("app-menu");
    this.bonkSection = document.getElementById("bonk-playground");
    this.bonkOnImageOutputElement = document.querySelector(".bonk-on-image");
    this.bonkOnVideoOutputElement = document.querySelector(".bonk-on-video");
    this.inputFileElement = document.getElementById("bonk-file-input");
    this.bonkAudioElement = document.querySelector(".bonk-audio");
    this.pointerElement = document.querySelector(".doge-pointer");
    this.crosshairElement = document.querySelector("._crosshair");

    this.radioCoverSize = document.getElementById("output-size-cover");
    this.radioContainSize = document.getElementById("output-size-contain");

    this.appContainer = document.querySelector(".app-container");

    this.bonkAudioElement.volume = 0.5;
  }

  render(element, boolean) {
    if (element === "menu") {
      return boolean ? this.appMenuSection.classList.remove("none") : this.appMenuSection.classList.add("none");
    }

    if (element === "pointer") {
      return boolean ? this.pointerElement.classList.remove("none") : this.pointerElement.classList.add("none");
    }

    if (element === "bonk") {
      return boolean ? this.pointerElement.classList.add("bonk") : this.pointerElement.classList.remove("bonk");
    }

    if (element === "bonked" && boolean) {
      const bonkedElement = document.createElement("div");
      bonkedElement.classList.add("bonked");

      const crosshairCordinate = this.getElementCordinate(this.crosshairElement);
      bonkedElement.style.top = crosshairCordinate.y - crosshairCordinate.height / 2 + "px";
      bonkedElement.style.left = crosshairCordinate.x - crosshairCordinate.width / 2 + "px";

      this.appContainer.appendChild(bonkedElement);

      this.runAfter(1000, () => {
        bonkedElement.remove();
      });

      return;
    }

    boolean ? this.bonkSection.classList.remove("none") : this.bonkSection.classList.add("none");
  }

  getElementCordinate(element) {
    return element.getBoundingClientRect();
  }

  playBonkAudio() {
    if (this.bonkAudioElement.currentTime > 0) {
      this.bonkAudioElement.pause();
      this.bonkAudioElement.currentTime = 0;
    }

    this.bonkAudioElement.play();
  }

  runAfter(duration, callback) {
    setTimeout(() => {
      callback();
    }, duration);
  }

  setCounter(val) {
    this.bonkCounterElement.textContent = `${val} bonk`;
  }

  setPointer(x, y) {
    this.pointerElement.style.top = y + -this.pointerElement.clientHeight / 1.2 + "px";
    this.pointerElement.style.left = x - this.pointerElement.clientWidth * 2 + "px";
  }

  isFileSelected() {
    return this.inputFileElement.files.length === 0 ? false : true;
  }

  resetOutput() {
    document.querySelectorAll(".output").forEach((el) => {
      if (el.src !== "") {
        URL.revokeObjectURL(el.src);
      }

      el.src = "";
    });
  }

  setOutputSize(val) {
    this.bonkOnImageOutputElement.classList.remove("contain", "cover");
    this.bonkOnVideoOutputElement.classList.remove("contain", "cover");

    if (val === "contain") {
      this.bonkOnImageOutputElement.classList.add("contain");
      this.bonkOnVideoOutputElement.classList.add("contain");
      return;
    }

    this.bonkOnImageOutputElement.classList.add("cover");
    this.bonkOnVideoOutputElement.classList.add("cover");
  }
}

export default View;
