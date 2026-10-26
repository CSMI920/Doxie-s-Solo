
/* =========================================
   SLIDESHOW AND SONG PLAYER
   ========================================= */

// Slideshow images
const images = [
  "./img/ms-sheet.png",
  "./img/Title-IMG.png",
  "./img/giz2.jpg"
];

// Songs corresponding to each image
// Make sure these paths match your actual files!
const songs = [
  "./song/Song1.mp3",
  "./song/Song2.mp3",
  "./song/Song3.mp3"
];

// Destination page
const SONG_PAGE = "./Conclustion.html";

// Slideshow state
let currentIndex = 0;
let isTransitioning = false;


/* =========================================
   SLIDESHOW ELEMENTS
   ========================================= */

const slide = document.getElementById("slide");
const slideLink = document.getElementById("slide-link");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const continueButton =
  document.getElementById("continue-button");


/* =========================================
   SELECT SONG
   ========================================= */

// Save the song associated with the displayed image
function saveSelectedSong() {
  try {
    sessionStorage.setItem(
      "selectedSong",
      songs[currentIndex]
    );
  } catch (error) {
    console.error("Could not save the selected song:", error);
  }
}


/* =========================================
   CLICKABLE IMAGE
   ========================================= */

// Clicking the picture selects the song.
// It does NOT navigate to another page.
if (slideLink) {
  slideLink.href = SONG_PAGE;

  slideLink.addEventListener("click", (event) => {
    event.preventDefault();
    saveSelectedSong();
  });
}


/* =========================================
   SLIDESHOW ANIMATION
   ========================================= */

function changeSlide(direction) {
  if (!slide || isTransitioning) return;

  isTransitioning = true;

  const goingNext = direction === "next";

  const exitClass = goingNext
    ? "slide-out-left"
    : "slide-out-right";

  const enterFrom = goingNext
    ? "30px"
    : "-30px";

  const step = goingNext ? 1 : -1;

  const newIndex =
    (currentIndex + step + images.length) %
    images.length;

  // Animate the current image out
  slide.classList.add(exitClass);

  setTimeout(() => {
    currentIndex = newIndex;

    // Update the image
    slide.src = images[currentIndex];
    slide.alt = `Song choice ${currentIndex + 1}`;

    // Prepare the entrance animation
    slide.style.transition = "none";
    slide.style.transform = `translateX(${enterFrom})`;
    slide.style.opacity = "0";

    slide.classList.remove(
      "slide-out-left",
      "slide-out-right"
    );

    // Force the browser to apply the starting styles
    void slide.offsetHeight;

    // Animate the new image in
    slide.style.transition =
      "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";

    slide.style.transform = "translateX(0)";
    slide.style.opacity = "1";

    // Reset animation styles
    setTimeout(() => {
      slide.style.transition = "";
      slide.style.transform = "";
      slide.style.opacity = "";

      isTransitioning = false;
    }, 500);

  }, 500);
}


/* =========================================
   PREVIOUS AND NEXT ARROWS
   ========================================= */

if (prev) {
  prev.addEventListener("click", () => {
    changeSlide("prev");
  });
}

if (next) {
  next.addEventListener("click", () => {
    changeSlide("next");
  });
}


/* =========================================
   MAIN NEXT BUTTON
   ========================================= */

// This is the ONLY slideshow control that
// navigates to Conclustion.html.
if (continueButton) {
  continueButton.addEventListener("click", () => {
    saveSelectedSong();

    window.location.href = SONG_PAGE;
  });
}


/* =========================================
   SONG PLAYER PAGE
   Conclustion.html
   ========================================= */

const audio = document.getElementById("audio");

if (audio) {
  let selectedSong = null;

  try {
    selectedSong = sessionStorage.getItem("selectedSong");
  } catch (error) {
    console.error("Could not retrieve the selected song:", error);
  }

  if (selectedSong) {
    audio.src = selectedSong;
    audio.load();

    // Autoplay may be blocked by the browser.
    // The audio controls let the user press Play.
    audio.play().catch((error) => {
      console.log(
        "Press Play to start the selected song.",
        error.message
      );
    });

  } else {
    console.warn(
      "No song selected. Return to the slideshow first."
    );
  }
}
