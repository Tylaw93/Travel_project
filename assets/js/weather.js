const myKey = "380d4cdd56fdc23a8e5b27377509f220";

const searchForm = document.querySelector("#searchForm");
const currentForecast = document.querySelector("#currentForecast");
const forecast = document.querySelector("#sevenDayForecast");

let currCity = "";
let coords = [];
let response;

function weatherSearch(event) {
  event.preventDefault();
  const city = event.target.elements[0].value;
  latLongFetch(city);
}

function latLongFetch(city) {
  const cityReqURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;
  fetch(cityReqURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currCity = data.name;
      coords = [];
      coords.push(data.coord.lat);
      coords.push(data.coord.lon);
      renderWeather(coords);
    });
}

function renderWeather(coords) {
  const lat = coords[0];
  const lon = coords[1];
  const weatherReqURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${myKey}`;
  fetch(weatherReqURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // 'TODAY' RENDER
      const today = document.createElement("p");
      today.classList.add("font-semibold");
      today.innerText = "TODAY";
      currentForecast.appendChild(today);
      // CITY NAME RENDER
      const city = document.createElement("p");
      city.classList.add("font-bold");
      city.innerText = currCity;
      currentForecast.appendChild(city);
      // CURRENT CONDITIONS RENDER
      // APPEND CONDITION ICON TO DIV
      const fIcon = document.createElement("img");
      const fIconSrc = data.daily[0].weather[0].icon;
      const fIconAlt = data.daily[0].weather[0].description;
      fIcon.src = `http://openweathermap.org/img/wn/${fIconSrc}.png`;
      fIcon.alt = fIconAlt;
      fIcon.class = "forecastIcon";
      currentForecast.appendChild(fIcon);

      // CONVERT AND RENDER DATE

      // temp.innerHTML = `Temp: ${data.current.temp}&deg; F`;
      // humid.innerText = `Humidity: ${data.current.humidity}%`;
      // wind.innerText = `Wind speed: ${data.current.wind_speed} MPH`;
      // uvi.innerHTML = `UV Index: <span class="uvColor">${data.current.uvi}</span>`;
      // const uvColor = document.querySelector(".uvColor");
      // if (data.current.uvi < 3) {
      // 		// for uvindex of 0-2
      // 		uvColor.classList.add("uvLow");
      // } else if (data.current.uvi >= 3 && data.current.uvi < 6) {
      // 		// for uvindex of 3-5
      // 		uvColor.classList.add("uvModerate");
      // } else if (data.current.uvi >= 6 && data.current.uvi < 8) {
      // 		// for uvindex of 6-7
      // 		uvColor.classList.add("uvHigh");
      // } else if (data.current.uvi >= 8 && data.current.uvi < 11) {
      // 		// for uvindex of 8-10
      // 		uvColor.classList.add("uvVeryHigh");
      // } else {
      // 		// for uvindex of 11+
      // 		uvColor.classList.add("uvExtreme");
      // }
      // 5 DAY FORECAST DELETE EXISTING BEFORE RE-RENDER
      document
        .querySelectorAll(".forecastInd")
        .forEach((e) => e.parentNode.removeChild(e));
      // 8 DAY FORECAST RENDER
      const forecastData = data.daily;
      console.log(forecastData);
      for (let i = 1; i < forecastData.length - 1; i++) {
        buildForecastTile(forecastData[i], 1);
      }
    });
}

function buildForecastTile(data) {
  console.log(data);
  // const future = document.querySelector("#sevenDayForecast");
  // CREATE INDIVIDUAL DAY CELL
  const weatherCell = document.createElement("div");
  weatherCell.classList.add("forecastInd");
  weatherCell.classList.add("flex");
  weatherCell.classList.add("flex-col");
  weatherCell.classList.add("justify-center");
  weatherCell.classList.add("items-center");
  weatherCell.classList.add("forecastInd");
  weatherCell.classList.add("py-1");
  weatherCell.classList.add("w-2/5");
  weatherCell.classList.add("bg-gray-300");
  weatherCell.classList.add("rounded-2xl");
  // APPEND DIV FOR DATE / ICON TO CELL
  const dateIcon = document.createElement("div");
  dateIcon.classList.add("date-icon");
  weatherCell.appendChild(dateIcon);
  // APPEND DATE TO DIV
  const date = document.createElement("p");
  const today = data.dt;
  const day = moment.unix(today).format("MMM Do");
  date.innerText = day;
  dateIcon.appendChild(date);
  // APPEND CONDITION ICON TO DIV
  const fIcon = document.createElement("img");
  const fIconSrc = data.weather[0].icon;
  const fIconAlt = data.weather[0].description;
  fIcon.src = `http://openweathermap.org/img/wn/${fIconSrc}.png`;
  fIcon.alt = fIconAlt;
  fIcon.class = "forecastIcon";
  dateIcon.appendChild(fIcon);
  // APPEND DIV2 FOR DATA TO CELL
  const dayDataCell = document.createElement("div");
  dayDataCell.classList.add("fiveDayData");
  weatherCell.appendChild(dayDataCell);
  // APPEND TEMP TO DIV2
  const fDayTemp = document.createElement("p");
  fDayTemp.innerHTML = `Temp: ${data.temp.day}&deg; F`;
  dayDataCell.appendChild(fDayTemp);
  // APPEND HUMIDITY TO DIV2
  const fDayHumid = document.createElement("p");
  fDayHumid.innerText = `Humidity: ${data.humidity}%`;
  dayDataCell.appendChild(fDayHumid);
  // APPEND TILE TO 8 DAY FORECAST CONTAINER
  forecast.appendChild(weatherCell);

  response = {};
}

searchForm.addEventListener("submit", weatherSearch);
