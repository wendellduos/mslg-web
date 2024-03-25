let isPlaying = false;
let current = 0;

const controls = {
  previous: document.getElementById("previous-btn"),
  play: document.getElementById("play-pause-btn"),
  next: document.getElementById("next-btn"),
};

const timeline = document.getElementById("player-timeline");

const songs = document.querySelectorAll("audio");

controls.play.addEventListener("click", () => {
  if (isPlaying) {
    songs[current].pause();
    isPlaying = false;

    clearInterval(timelineProgress);
  } else {
    songs[current].play();
    isPlaying = true;

    var timelineProgress = setInterval(() => {
      let elapsed = songs[current].currentTime;
      let total = songs[current].duration;

      let percent = (elapsed / total) * 100;

      timeline.style.backgroundImage = `linear-gradient(to right, white ${percent}%, transparent ${percent}%)`;

      console.log(percent);
    }, 500);
  }
});
