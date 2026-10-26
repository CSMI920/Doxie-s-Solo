// JS scripts placed here

const images = [
  "./img/ms-sheet.png",
  "./img/Title-IMG.png",
  "./img/giz2.jpg"
];

let currentIndex = 0;
let isTransitioning = false;

const slide = document.getElementById("slide");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

function changeSlide(direction) {
  if (isTransitioning) return;

  isTransitioning = true;

  const exitClass =
    direction === "next"
      ? "slide-out-left"
      : "slide-out-right";

  const enterFrom =
    direction === "next" ? "30px" : "-30px";

  const newIndex =
    (currentIndex +
      (direction === "next" ? 1 : -1) +
      images.length) % images.length;

  // Slide the current image out and fade it out
  slide.classList.add(exitClass);

  setTimeout(() => {
    currentIndex = newIndex;

    // Set the new image
    slide.src = images[currentIndex];

    // Position the new image off-center and make it transparent
    slide.style.transition = "none";
    slide.style.transform = `translateX(${enterFrom})`;
    slide.style.opacity = "0";

    slide.classList.remove(
      "slide-out-left",
      "slide-out-right"
    );

    // Apply the starting styles before animating
    slide.offsetHeight;

    // Slide in and fade in simultaneously
    slide.style.transition =
      "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";

    slide.style.transform = "translateX(0)";
    slide.style.opacity = "1";

    // Allow time for the animation to finish
    setTimeout(() => {
      slide.style.transition = "";
      slide.style.transform = "";
      slide.style.opacity = "";

      isTransitioning = false;
    }, 500);

  }, 500);
}

next.addEventListener("click", () => {
  changeSlide("next");
});

prev.addEventListener("click", () => {
  changeSlide("prev");
});
