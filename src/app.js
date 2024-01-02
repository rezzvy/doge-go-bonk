const pointer = document.querySelector(".doge-pointer");
const bonkAudio = document.querySelector(".bonk-audio");

const bonkFileInput = document.getElementById("bonk-file-input");

const bonkOnImage = document.querySelector(".bonk-on-image");
const bonkOnVideo = document.querySelector(".bonk-on-video");

const bonkPlayGround = document.getElementById("bonk-playground");
const appMenu = document.getElementById("app-menu");

function bonk_audio_play() {
  if (bonkAudio.currentTime > 0) {
    bonkAudio.pause();
    bonkAudio.currentTime = 0;
  }

  bonkAudio.play();
}

window.addEventListener("mousemove", (e) => {
  const pointerSizeW = pointer.clientWidth / 2;
  const pointerSizeH = pointer.clientHeight / 2;

  pointer.style.top = e.clientY - pointerSizeH + "px";
  pointer.style.left = e.clientX - pointerSizeW + "px";
});

window.addEventListener("click", (e) => {
  pointer.classList.add("bonk");

  setTimeout(() => {
    bonk_audio_play();
    pointer.classList.remove("bonk");
  }, 100);
});

bonkFileInput.addEventListener("input", (e) => {
  const file = e.target.files[0];
  const fileType = file.type.split("/")[0];

  if (fileType === "image") {
    bonkOnImage.src = URL.createObjectURL(file);
  } else {
    bonkOnVideo.src = URL.createObjectURL(file);
    bonkOnVideo.play();
  }

  appMenu.classList.add("none");
  bonkPlayGround.classList.remove("none");
});
