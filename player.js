let isPlaying = false;
let current = 0;

const controls = {
  previous: document.getElementById("previous-btn"),
  play: document.getElementById("play-pause-btn"),
  next: document.getElementById("next-btn"),
};

const timeline = document.getElementById("player-timeline");

const songs = document.querySelectorAll("audio");

let timelineProgress;

updateSongCountDisplay();

// play-pause-btn
controls.play.addEventListener("click", () => {
  if (isPlaying) {
    songs[current].pause();
    isPlaying = false;

    controls.play.style.border = "solid 2px rgba(255, 255, 255, 0)";

    clearInterval(timelineProgress);
  } else {
    songs[current].play();
    isPlaying = true;

    controls.play.style.border = "solid 2px rgba(255, 255, 255, 0.2)";

    timelineProgress = setInterval(() => {
      let elapsed = songs[current].currentTime;
      let total = songs[current].duration;

      let percent = (elapsed / total) * 100;

      timeline.style.backgroundImage = `linear-gradient(to right, white ${percent}%, rgba(255, 255, 255, 0.2) ${percent}%)`;
    }, 1000);
  }
});

// previous-btn
controls.previous.addEventListener("click", () => {
  const elapsedTime = songs[current].currentTime;

  songs[current].pause();
  songs[current].currentTime = 0;

  if (elapsedTime < 3 && current > 0) {
    current--;
    updateSongCountDisplay();
  }

  if (isPlaying) {
    songs[current].play();
  }
});

// next-btn
controls.next.addEventListener("click", () => {
  if (current < songs.length - 1) {
    songs[current].pause();
    songs[current].currentTime = 0;

    current++;
    updateSongCountDisplay();

    if (isPlaying) {
      songs[current].play();
    }
  }
});

// fetch timeline
timeline.addEventListener("mousedown", (e) => {
  const clickedInPx = e.layerX - e.explicitOriginalTarget.offsetLeft;
  const timelineWidthInPx = e.explicitOriginalTarget.offsetWidth;
  const percent = clickedInPx / timelineWidthInPx;
  const songLength = songs[current].duration;
  const fetchToInSecs = songLength * percent;

  timeline.addEventListener("mouseup", () => {
    songs[current].currentTime = fetchToInSecs;

    if (!isPlaying) {
      timeline.style.backgroundImage = `linear-gradient(to right, white ${
        percent * 100
      }%, rgba(255, 255, 255, 0.2) ${percent * 100}%)`;
    }
  });
});

function updateSongCountDisplay() {
  document.getElementById("song-count-wrp").innerHTML = "";

  for (i = 0; i <= songs.length - 1; i++) {
    if (i === current) {
      document.getElementById(
        "song-count-wrp"
      ).innerHTML += `<div class="song-count playing"></div>`;
    } else {
      document.getElementById(
        "song-count-wrp"
      ).innerHTML += `<div class="song-count"></div>`;
    }
  }
}
