

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


