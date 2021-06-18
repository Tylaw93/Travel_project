const navBarToggle = document.getElementById("jsnav-toggle");
const mainNav = document.getElementById("jsmenu");

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("invisible");
});
