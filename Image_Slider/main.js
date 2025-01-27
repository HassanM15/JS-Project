const images = document.querySelectorAll(".image-container img");
const overlay = document.getElementById("overlay");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

function showModal(index) {
  currentIndex = index;
  modalImage.src = images[currentIndex].src;
  overlay.style.display = "flex";
}

function closeModal() {
  overlay.style.display = "none";
}


function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImage.src = images[currentIndex].src;
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  modalImage.src = images[currentIndex].src;
}

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    showModal(index);
  });
});

closeBtn.addEventListener("click", closeModal);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);


overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});
