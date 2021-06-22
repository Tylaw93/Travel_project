const myKey = "380d4cdd56fdc23a8e5b27377509f220";

const searchForm = document.querySelector("#searchForm");
const currentForecast = document.querySelector("#currentForecast");
const forecast = document.querySelector("#sevenDayForecast");

let currCity = "";
let coords = [];
// eslint-disable-next-line no-unused-vars
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
  currentForecast.innerHTML = "";
  const lat = coords[0];
  const lon = coords[1];
  const weatherReqURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${myKey}`;
  fetch(weatherReqURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // LEFT SIDE CONTAINER
      const left = document.createElement("div");
      left.classList.add("flex");
      left.classList.add("flex-col");
      left.classList.add("justify-evenly");
      left.classList.add("items-center");
      left.classList.add("py-1");
      left.classList.add("w-1/2");
      // 'TODAY' RENDER
      const today = document.createElement("p");
      today.classList.add("font-semibold");
      today.innerText = "TODAY";
      left.appendChild(today);
      // CITY NAME RENDER
      const city = document.createElement("p");
      city.classList.add("font-bold");
      city.innerText = currCity;
      left.appendChild(city);
      // CURRENT CONDITIONS RENDER
      const fIcon = document.createElement("img");
      const fIconSrc = data.daily[0].weather[0].icon;
      const fIconAlt = data.daily[0].weather[0].description;
      fIcon.src = `http://openweathermap.org/img/wn/${fIconSrc}.png`;
      fIcon.alt = fIconAlt;
      fIcon.class = "forecastIcon";
      left.appendChild(fIcon);
      currentForecast.appendChild(left);

      // RIGHT SIDE CONTAINER
      const right = document.createElement("div");
      right.classList.add("flex");
      right.classList.add("flex-col");
      right.classList.add("justify-between");
      right.classList.add("sm:items-start");
      right.classList.add("md:pl-8");
      right.classList.add("py-1");
      right.classList.add("w-1/2");
      right.classList.add("gap-1");
      // APPEND TEMP
      const temp = document.createElement("p");
      temp.innerHTML = `Temp: ${data.daily[0].temp.day}&deg; F`;
      right.appendChild(temp);
      // APPEND HUMIDITY
      const humid = document.createElement("p");
      humid.innerText = `Humidity: ${data.daily[0].humidity}%`;
      right.appendChild(humid);
      // APPEND UVI
      const uvi = document.createElement("p");
      const uvValue = data.daily[0].uvi;
      let uvColor = "";
      let textColor = "";
      if (uvValue < 3) {
        // for uvindex of 0-2
        uvColor = "bg-green-500";
        textColor = "text-white";
      } else if (uvValue >= 3 && uvValue < 6) {
        // for uvindex of 3-5
        uvColor = "bg-yellow-300";
      } else if (uvValue >= 6 && uvValue < 8) {
        // for uvindex of 6-7
        uvColor = "bg-yellow-600";
      } else if (uvValue >= 8 && uvValue < 11) {
        // for uvindex of 8-10
        uvColor = "bg-red-600";
        textColor = "text-white";
      } else {
        // for uvindex of 11+
        uvColor = "bg-purple-700";
        textColor = "text-white";
      }
      uvi.innerHTML = `UV Index: <span class="${uvColor} ${textColor} px-2 rounded-2xl">${uvValue}</span>`;
      right.appendChild(uvi);
      currentForecast.appendChild(right);

      // 8 DAY FORECAST RENDER
      forecast.innerHTML = "";
      const forecastData = data.daily;
      // console.log(forecastData);
      for (let i = 1; i < forecastData.length - 1; i++) {
        buildForecastTile(forecastData[i], 1);
      }
    });
}

function buildForecastTile(data) {
  // console.log(data);
  // CREATE INDIVIDUAL DAY CELL
  const weatherCell = document.createElement("div");
  weatherCell.classList.add("forecastInd");
  weatherCell.classList.add("flex");
  weatherCell.classList.add("flex-col");
  weatherCell.classList.add("sm:justify-evenly");
  weatherCell.classList.add("md:justify-center");
  weatherCell.classList.add("items-center");
  weatherCell.classList.add("forecastInd");
  weatherCell.classList.add("py-1");
  weatherCell.classList.add("w-2/5");
  weatherCell.classList.add("md:w-3/12");
  weatherCell.classList.add("lg:w-2/5");
  weatherCell.classList.add("bg-gray-300");
  weatherCell.classList.add("rounded-2xl");
  // APPEND DIV FOR DATE / ICON TO CELL
  const dateIcon = document.createElement("div");
  dateIcon.classList.add("date-icon");
  weatherCell.appendChild(dateIcon);
  // APPEND DATE TO DIV
  const date = document.createElement("p");
  const today = data.dt;
  // eslint-disable-next-line no-undef
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
