/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
const apikey = "5ae2e3f221c38a28845f05b63b141ff8b556302ea945abb40cb4ffe1";
// eslint-disable-next-line no-undef
// const cityName = "St. Louis";

document.addEventListener("submit", getCityName);

function getLocalAttractions(data) {
  const atttractions = `https://api.opentripmap.com/0.1/en/places/radius?radius=200&lon=${data.lon}&${data.lat}&apikey=${apikey}`;
  fetch(atttractions)
    .then(function (response) {
      return response.json();
    })
    .then(function (museums) {
      console.log(museums);
    });
}
function getCityName(params) {
  const cityName = document.querySelector("#city").value;
  // eslint-disable-next-line no-undef
  const getLatLon = `https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=${apikey}`;
  fetch(getLatLon)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
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
        zoom: 10, // starting zoom
      });
      fetch();
      map.on("load", function () {
        map.addSource("places", {
          type: "geojson",
          data: { data },
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
          map.getCanvas().style.cursor = "pointer";

          let coordinates = e.features[0].geometry.coordinates.slice();
          let description = e.features[0].properties.description;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on("mouseleave", "places", function () {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    });
}
