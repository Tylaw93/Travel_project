const apikey = "5ae2e3f221c38a28845f05b63b141ff8b556302ea945abb40cb4ffe1";
// eslint-disable-next-line no-undef
const cityName = "St. Louis";
const getLatLon = `https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=${apikey}`;

fetch(getLatLon)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
