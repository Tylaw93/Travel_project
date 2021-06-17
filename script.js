const apikey = "5ae2e3f221c38a28845f05b63b141ff8b556302ea945abb40cb4ffe1";
// eslint-disable-next-line no-undef
// const cityName = "St. Louis";

document.addEventListener("submit", getCityName);
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
        style: "mapbox://styles/mapbox/light-v10", // style URL
        center: [data.lon, data.lat], // starting position [lng, lat]
        zoom: 10, // starting zoom
      });
    });
}
