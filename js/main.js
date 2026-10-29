// Typewriter Effect 
const dialogue = [
  {
    id: "title",
    text: "Doxie loves to play the violin..."
  },
  {
    id: "paragraph1",
    text: "She especially loves to play for her boyfriend Dobber!"
  },
  {
    id: "paragraph2",
    text: "Tomorrow, it's their one-year anniversary. So Doxie is preparing a special song for Dobber."
  },
  {
    id: "subtitle",
    text: "But Doxie has a huge problem..."
  },
  {
    id: "paragraph3",
    text: "She can't decide what song she wants to play for Dobber on her violin."
  },
  {
    id: "paragraph4",
    text: "\"There's just too many love songs!\" she says. \"Every love song reminds me of Dobber.\""
  },
  {
    id: "paragraph5",
    text: "Will you help Doxie pick a song to play?"}];


    const speed = 10; //change this to 80 wbefore submittting!
let itemIndex = 0;
let charIndex = 0;

function typeWriter() {
  if (itemIndex >= dialogue.length) {
  document.getElementById("yes").classList.add("show");
  return;}

  const item = dialogue[itemIndex];
  const element = document.getElementById(item.id);

  if (charIndex < item.text.length) {
    element.textContent += item.text.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, speed);
  } else {
    itemIndex++;
    charIndex = 0;
    setTimeout(typeWriter, 300);}}

typeWriter();


 // Slideshow/MusicPlayer JS
const images = [
  "./img/ms-sheet.png",
  "./img/Title-IMG.png",
  "./img/giz2.jpg"];


const songs = [
  "./song/Song1.mp3",
  "./song/Song2.mp3",
  "./song/Song3.mp3"];


  const SONG_PAGE = "./_4ending.html";

let currentIndex = 0;
let isTransitioning = false;

const slide = document.getElementById("slide");
const slideLink = document.getElementById("slide-link");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const continueButton =
  document.getElementById("continue-button");



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

if (slideLink) {
  slideLink.href = SONG_PAGE;

  slideLink.addEventListener("click", (event) => {
    event.preventDefault();
    saveSelectedSong();
  });}


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

  slide.classList.add(exitClass);

  setTimeout(() => {
    currentIndex = newIndex;

    slide.src = images[currentIndex];
    slide.alt = `Song choice ${currentIndex + 1}`;

    slide.style.transition = "none";
    slide.style.transform = `translateX(${enterFrom})`;
    slide.style.opacity = "0";

    slide.classList.remove(
      "slide-out-left",
      "slide-out-right"
    );

    void slide.offsetHeight;

    slide.style.transition =
      "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";

    slide.style.transform = "translateX(0)";
    slide.style.opacity = "1";

    setTimeout(() => {
      slide.style.transition = "";
      slide.style.transform = "";
      slide.style.opacity = "";

      isTransitioning = false;
    }, 500);

  }, 500);}


if (prev) {
  prev.addEventListener("click", () => {
    changeSlide("prev");
  });}

if (next) {
  next.addEventListener("click", () => {
    changeSlide("next");
  });}


if (continueButton) {
  continueButton.addEventListener("click", () => {
    saveSelectedSong();

    window.location.href = SONG_PAGE;
  });}

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
  }}


