const playerBtns = document.querySelectorAll(".player-btn");

playerBtns.forEach((button) => {
  button.addEventListener("mousedown", () => {
    button.classList = "player-btn clicked";
  });

  button.addEventListener("mouseup", () => {
    button.classList = "player-btn";
  });
});
