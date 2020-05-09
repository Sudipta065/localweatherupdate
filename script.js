function success(pos) {
  let coord = pos.coords;

  let lati = coord.latitude;
  let longi = coord.longitude;

  fetchApi(lati, longi);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);

function fetchApi(latitudes, longitudes) {
  let lat = latitudes;
  let lon = longitudes;

  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f64e34286ec3110a98b3b72018975f71`;

  fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      let weathe = data.main.temp;
      let nameOfCity = data.name;
      let nameOfCountry = data.sys.country;
      let description = data.weather[0].main;

      let tempFahrenheit = Math.round((weathe * 9) / 5 - 459.67) + '\u00B0F';

      let tempCelcius = Math.round(weathe - 273.15) + '\u00B0C';

      let changeUnit = false;

      showResults(tempCelcius, nameOfCity, nameOfCountry, description);

      document.querySelector('.btn').addEventListener('click', function() {
        if (!changeUnit) {
          showResults(tempFahrenheit, nameOfCity, nameOfCountry, description);
          changeUnit = true;
        } else {
          showResults(tempCelcius, nameOfCity, nameOfCountry, description);
          changeUnit = false;
        }
      });
    });
}

function showResults(w, nCity, nCountry, descrip) {
  const searchResults = document.querySelector('.showResult');
  searchResults.innerHTML = '';
  searchResults.insertAdjacentHTML(
    'beforeend',

    `<div class="result-div">
    <div class="cico"> 
    ${nCity},${nCountry}
    </div>
    <div class="temp">${w}</div>
    
    <div class="link-result">${descrip}</div>
    </div>`
  );
}
