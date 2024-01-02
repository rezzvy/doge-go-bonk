const pointer = document.querySelector(".doge-pointer");
const bonkAudio = document.querySelector(".bonk-audio");

const bonkFileInput = document.getElementById("bonk-file-input");

const bonkOnImage = document.querySelector(".bonk-on-image");
const bonkOnVideo = document.querySelector(".bonk-on-video");

const bonkPlayGround = document.getElementById("bonk-playground");
const appMenu = document.getElementById("app-menu");

const startBtn = document.getElementById("start-bonk-btn");
const stopBtn = document.getElementById("stop-btn");

let bonkCounter = 1;

const bonkCounterElement = document.querySelector("._counter");

let type = "";

let isStarted = false;

function bonk_audio_play() {
  if (bonkAudio.currentTime > 0) {
    bonkAudio.pause();
    bonkAudio.currentTime = 0;
  }

  bonkAudio.play();
}

window.addEventListener("mousemove", (e) => {
  if (!isStarted) return;

  const pointerSizeW = pointer.clientWidth / 2;
  const pointerSizeH = pointer.clientHeight / 2;

  pointer.style.top = e.clientY - pointerSizeH + "px";
  pointer.style.left = e.clientX - pointerSizeW + "px";
});

let crosshairElement = document.querySelector("._crosshair");

window.addEventListener("click", (e) => {
  if (!isStarted) return;
  pointer.classList.add("bonk");

  const bonkedElement = document.createElement("div");
  bonkedElement.classList.add("bonked");

  const cordinate = crosshairElement.getBoundingClientRect();

  bonkedElement.style.top = cordinate.y + "px";
  bonkedElement.style.left = cordinate.x + "px";

  document.body.appendChild(bonkedElement);

  setTimeout(() => {
    bonk_audio_play();
    bonkCounterElement.textContent = bonkCounter++ + " bonk";
    pointer.classList.remove("bonk");

    setTimeout(() => {
      bonkedElement.remove();
    }, 1000);
  }, 100);
});

bonkFileInput.addEventListener("input", (e) => {
  const file = e.target.files[0];
  const fileType = file.type.split("/")[0];

  if (fileType === "image") {
    bonkOnImage.src = URL.createObjectURL(file);
    type = "image";
  } else {
    bonkOnVideo.src = URL.createObjectURL(file);
    type = "video";
  }
});

startBtn.addEventListener("click", (e) => {
  if (bonkFileInput.files.length === 0) return console.log("Select an image or video first pal!");

  pointer.classList.remove("none");
  appMenu.classList.add("none");
  bonkPlayGround.classList.remove("none");

  if (type !== "image") {
    bonkOnVideo.play();
  }

  setTimeout(() => {
    isStarted = true;
  }, 50);
});

stopBtn.addEventListener("click", (e) => {
  isStarted = false;
  type = "";

  document.querySelectorAll(".output").forEach((el) => {
    if (el.src !== "") {
      URL.revokeObjectURL(el.src);
    }

    el.src = "";
  });

  bonkFileInput.value = "";

  appMenu.classList.remove("none");
  bonkPlayGround.classList.add("none");
  pointer.classList.add("none");

  bonkCounter = 1;
  bonkCounterElement.textContent = "1 bonk";
});

stopBtn.addEventListener("mouseover", (e) => {
  pointer.classList.add("none");
});

stopBtn.addEventListener("mouseout", (e) => {
  pointer.classList.remove("none");
});
