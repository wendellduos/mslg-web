const images = document.querySelectorAll(".image-item");

const modal = document.getElementById("modal");

const modalClosingEl = [
  document.getElementById("modal-mask"),
  document.getElementById("close-modal-btn"),
];

modalClosingEl.forEach((el) => {
  el.addEventListener("click", () => {
    modal.style.visibility = "hidden";
  });
});

images.forEach((img) => {
  img.addEventListener("click", () => {
    openImg(img.src);
  });
});

function openImg(source) {
  const modalImg = document.getElementById("modal-img");

  modalImg.src = source;
  modal.style.visibility = "visible";
}
