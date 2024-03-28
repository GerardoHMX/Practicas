const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
let index = 0;

function type() {
  document.getElementById("typewriter").innerText += text[index];
  index++;
  if (index < text.length) {
    setTimeout(type, 100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  type();
});
