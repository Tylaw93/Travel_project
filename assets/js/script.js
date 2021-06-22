/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
const apikey = "5ae2e3f221c38a28845f05b63b141ff8b556302ea945abb40cb4ffe1";
// eslint-disable-next-line no-undef
// const cityName = "St. Louis";
let tempCityName;
/*
we need to set #locationImg and #locationDesc .innerHTML("") when beginning search begins so that a new city search clears results from the previous city


*/
let favorites = [];
let favors = [new Set(favorites)];
document.addEventListener("submit", getCityName);
function saveFavs(city) {
  localStorage.setItem(city, JSON.stringify(favorites));
}
function loadFavs(city) {
  localStorage.getItem(city);
}
function renderFavs(favorites) {
  favorites.forEach((city) => {});
}

function favs(name) {
  $(".not-fav").click(function () {
    $(this).toggleClass("hidden");
    $(".fav").toggleClass("hidden");

    favorites.push(name);
  });
  $(".fav").click(function () {
    $(this).toggleClass("hidden");
    $(".not-fav").toggleClass("hidden");
    favorites.push(name);
  });
}
function addToMap(popup, coordinates, description, map) {
  popup
    .setLngLat(coordinates)
    .setHTML(
      description +
        `
  <ion-icon class="not-fav" name="heart-outline"></ion-icon>` +
        `<ion-icon class="fav md hydrated text-red-500 hidden" name="heart" role="img" aria-label="heart"></ion-icon>`
    )
    .addTo(map);
}

function getLocalAttractions(data, map) {
  const atttractions = `https://api.opentripmap.com/0.1/en/places/radius?radius=20000&lon=${data.lon}&lat=${data.lat}&kinds=museums&apikey=${apikey}`;

  fetch(atttractions)
    .then(function (response) {
      return response.json();
    })
    .then(function (museums) {
      map.on("load", function () {
        map.addSource("places", {
          type: "geojson",
          data: museums,
        });

        // Add a layer showing the places.
        map.addLayer({
          id: "places",
          type: "circle",
          source: "places",
          paint: {
            "circle-color": "#4264fb",
            "circle-radius": 6,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        });

        // Create a popup, but don't add it to the map yet.
        let popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        map.on("mouseenter", "places", function (e) {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = "";
          popup.remove();
          map.getCanvas().style.cursor = "pointer";
          console.log(e);

          $("#locationImg").html("");
          $("#locationDesc").html("");
          let coordinates = e.features[0].geometry.coordinates.slice();
          let description = e.features[0].properties.name;
          let details = e.features[0].properties;
          if (details.wikidata) {
            const atttractionDetails = `https://api.opentripmap.com/0.1/en/places/xid/${details.wikidata}?apikey=${apikey}`;

            fetch(atttractionDetails)
              .then(function (response) {
                return response.json();
              })
              .then(function (detail) {
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                if (detail.preview) {
                  $("#locationImg").html(
                    `<img src="${detail.preview.source}">`
                  );
                  $("#locationCont").removeClass("hidden");

                  $("#locationDesc").html(
                    detail.wikipedia_extracts
                      ? detail.wikipedia_extracts.html
                      : detail.info
                      ? detail.info.descr
                      : "No description"
                  );
                  addToMap(popup, coordinates, description, map);
                  favs(description);
                } else {
                  addToMap(popup, coordinates, description, map);
                  favs(description);
                }

                // Populate the popup and set its coordinates
                // based on the feature found.
              });
          } else {
            addToMap(popup, coordinates, description, map);
            favs(description);
          }

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
        });

        map.on("click", function () {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });

        map.on("click", "places", function (e) {
          map.getCanvas().style.cursor = "";
          popup.remove();
          $("#locationImg").html("");
          $("#locationDesc").html("");
          map.getCanvas().style.cursor = "pointer";

          let coordinates = e.features[0].geometry.coordinates.slice();
          let description = e.features[0].properties.name;
          let details = e.features[0].properties;
          if (details.wikidata) {
            const atttractionDetails = `https://api.opentripmap.com/0.1/en/places/xid/${details.wikidata}?apikey=${apikey}`;

            fetch(atttractionDetails)
              .then(function (response) {
                return response.json();
              })
              .then(function (detail) {
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                if (detail.preview) {
                  $("#locationImg").html(
                    `<img src="${detail.preview.source}">`
                  );
                  $("#locationCont").removeClass("hidden");

                  $("#locationDesc").html(
                    detail.wikipedia_extracts
                      ? detail.wikipedia_extracts.html
                      : detail.info
                      ? detail.info.descr
                      : "No description"
                  );
                  addToMap(popup, coordinates, description, map);
                  favs(description);
                } else {
                  addToMap(popup, coordinates, description, map);
                  favs(description);
                }

                // #locationImg #locationDesc

                // Populate the popup and set its coordinates
                // based on the feature found.
              });
          } else {
            addToMap(popup, coordinates, description, map);
            favs(description);
          }
        });
      });
    });
}

function getCityName(params) {
  const cityName = document.querySelector("#city").value;
  tempCityName = cityName;
  console.log(tempCityName);
  // eslint-disable-next-line no-undef
  const getLatLon = `https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=${apikey}`;

  fetch(getLatLon)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // eslint-disable-next-line no-undef
      mapboxgl.accessToken =
        "pk.eyJ1IjoidHlsYXc5MyIsImEiOiJja3B1N3hyeG8wdmRxMnVvNnNxa2VuaG5iIn0.lMBPEZ7KGl2Y2nJk0u1RDQ";
      // eslint-disable-next-line no-undef
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line prefer-const
      // eslint-disable-next-line no-undef
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [data.lon, data.lat], // starting position [lng, lat]
        zoom: 11, // starting zoom
      });
      $("#locationImg").html("");
      $("#locationDesc").html("");
      getLocalAttractions(data, map);
    });
}
localStorage.setItem("favorites", JSON.stringify(favorites));
let storedNames = JSON.parse(localStorage.favorites);
console.log(storedNames);
