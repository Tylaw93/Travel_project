// eslint-disable-next-line no-unused-vars
const navBarToggle = document.querySelector("#jsnav-toggle");
const mainNav = document.querySelector("#jsmenu");
const searchLink = document.querySelector("#aSearch");
const searchPage = document.querySelector("#searchResultCont");
const favLink = document.querySelector("#aFavorites");
const favPage = document.querySelector("#favoritesCont");

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("invisible");
});

searchLink.addEventListener("click", function () {
  event.preventDefault();
  console.log("Search");
  searchPage.classList.remove("hidden");
  favPage.classList.add("hidden");
});

favLink.addEventListener("click", function () {
  event.preventDefault();

  searchPage.classList.add("hidden");
  favPage.classList.remove("hidden");
});
