const apikey = "5ae2e3f221c38a28845f05b63b141ff8b556302ea945abb40cb4ffe1";
const cityName = "St. Louis";
const getLatLon = `https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=${apikey}`;

fetch(getLatLon)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

fetch().then(function (params) {});

/* eslint-disable no-var */
const archLatLon = [38.6247, -90.1848];
const accessToken =
  "pk.eyJ1IjoidHlsYXc5MyIsImEiOiJja3B1N3hyeG8wdmRxMnVvNnNxa2VuaG5iIn0.lMBPEZ7KGl2Y2nJk0u1RDQ";

// console.log(id, z, x, y);

// const cityMap =
//   "https://api.opentripmap.com/0.1/­{lang}­/tiles/{layer}­/{z}­/{x}­/{y}.pbf?kinds={kinds}&rate={rate}&apikey={apikey}";

const autocompleteName = `https://api.opentripmap.com/0.1/en/places/autosuggest?name=St.%20Louis&radius=200&lon=-90.19789&lat=38.62727&apikey=${apikey}`;
fetch(getLatLon)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;
  // eslint-disable-next-line no-undef
  var mymap = L.map("mapid").setView([crd.latitude, crd.longitude], 13);
  // eslint-disable-next-line no-undef
  var marker = L.marker(archLatLon).addTo(mymap);
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  // eslint-disable-next-line no-undef
  L.tileLayer(
    `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,

    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: "your.mapbox.access.token",
    }
  ).addTo(mymap);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
