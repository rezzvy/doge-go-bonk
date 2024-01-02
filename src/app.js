const pointer = document.querySelector(".doge-pointer");
const bonkAudio = document.querySelector(".bonk-audio");

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
