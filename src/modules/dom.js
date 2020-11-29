/* <div class="row h-100 w-100 align-items-center justify-content-center m-0 position-absolute">
<div class="col-12 col-md-6 col-lg-4">
  <div class="weather-card one">
    <div class="top">
      <div class="wrapper">
        <h1 class="heading">Clear night</h1>
        <h3 class="location">Dhaka, Bangladesh</h3>
        <i class="wi wi-owm-200"></i>
        <p class="temp">
          <span class="temp-value">20</span>
          <span class="deg">°</span>
          <span class="temp-type">C</span>
        </p>
        <table class="table-temp">
          <tr>
            <th>Feels Like:</th>
            <th>Max. Temp:</th>
            <th>Min. Temp:</th>
          </tr>
          <tr>
            <td><sup>°</sup><span class="temp-type">C</span></td>
            <td><sup>°</sup><span class="temp-type">C</span></td>
            <td><sup>°</sup><span class="temp-type">C</span></td>
          </tr>
        </table>

        <hr>
        <table class="table-humidity">
          <tr>
            <th>Humidity</th>
            <th>Pressure</th>
          </tr>
          <tr>
            <td>20%</td>
            <td>1000</td>
          </tr>
        </table>
        <hr>
        <h4>Wind</h4>
        <i class="wi wi-wind from-360-deg"></i>
        <table class="table-wind">
          <tr>
            <th>From</th>
            <th>Speed</th>
          </tr>
          <tr>
            <td>Northerly</td>
            <td>18-28 Km/h</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>
</div> */

// cityName: "Santa Fe"
// countryCode: "AR"
// countryName: "Argentina"
// humidity: 63
// pressure: 1010
// temperatures: {temp: 84.2, feels_like: 84.2, temp_min: 84.2, temp_max: 84.2, sea_level: 213.8, …}
// weather: {id: 500, main: "Rain", description: "Light rain", icon: "10d"}
// wind: {speed: 3.9, deg: 150, speedText: "20-28 Km/h", directionText: "South Easterly"}
const toggleSearchBar = () => {
  const searchBar = document.getElementById('search-container');
  if (searchBar.classList.contains('animate__zoomIn')) {
    searchBar.classList.remove('animate__zoomIn');
    searchBar.classList.add('fadeOut');
  } else {
    searchBar.classList.remove('animate__fadeOut');
    searchBar.classList.add('animate__zoomIn');
    searchBar.focus();
  }
};

const toggleLoadingAnimation = () => {
  const loadingAn = document.getElementById('loading-animation');
  loadingAn.classList.toggle('d-none');
};

const displayErrorSearchBar = () => {
  const errorBox = document.querySelector('.invalid-feedback');
  errorBox.classList.add('d-block');
};

function createEl(type, cl = '') {
  const el = document.createElement(type);
  if (cl !== '') {
    el.classList += cl;
  }
  return el;
}

function switchStatus() {
  return document.getElementById('switch-measurement').checked;
}

function getTempSign() {
  let sign = '';
  if (switchStatus()) {
    sign = 'C';
  } else {
    sign = 'F';
  }
  return sign;
}

const createWeatherCard = (data) => {
  const sup = document.createElement('sup');
  sup.innerText = '°';

  const tempType = createEl('span', 'temp-type');
  tempType.innerText = getTempSign();

  const hr = document.createElement('hr');
  const hr2 = document.createElement('hr');

  const row = document.getElementById('main-container');
  row.innerHTML = '';
  const weatherCardContainer = createEl('div', 'card weather-card-container text-center col-10 col-md-6 col-lg-4');
  const weatherCard = createEl('div', 'card-body');
  const heading = createEl('h1', 'card-title');
  heading.innerText = `${data.weather.description}`;

  const location = createEl('h3', 'card-subtitle mb-2 text-muted');
  location.innerText = `${data.cityName}, ${data.countryName}`;

  const mainIconContainer = createEl('h1', 'card-title');
  const mainIcon = createEl('i', `wi wi-owm-${data.weather.id}`);
  mainIconContainer.append(mainIcon);

  const temp = createEl('h1', 'temp');
  const tempValue = createEl('span', 'temp-value');
  tempValue.innerText = `${data.temperatures.temp}`;
  const tempDegree = createEl('span', 'deg');
  tempDegree.innerText = '°';

  temp.append(tempValue, tempDegree, tempType);
  const tableTempContainer = createEl('div', 'table-responsive');
  const tableTemp = createEl('table', 'table table-borderless table-fixed table-temp');
  const tableTempHeader = createEl('tr');
  const feelsLikeH = createEl('th');
  feelsLikeH.innerText = 'Feels Like';
  const maxTempH = createEl('th');
  maxTempH.innerText = 'Max. Temp';
  const minTempH = createEl('th');
  minTempH.innerText = 'Min. Temp';
  tableTempHeader.append(feelsLikeH, maxTempH, minTempH);

  const tableTempInfo = createEl('tr');
  const feelsLike = createEl('td');
  feelsLike.innerText = `${data.temperatures.feels_like} °${getTempSign()}`;
  const maxTemp = createEl('td');
  maxTemp.innerText = `${data.temperatures.temp_max} °${getTempSign()}`;
  const minTemp = createEl('td');
  minTemp.innerText = `${data.temperatures.temp_min} °${getTempSign()}`;
  tableTempInfo.append(feelsLike, maxTemp, minTemp);

  tableTemp.append(tableTempHeader, tableTempInfo);
  tableTempContainer.append(tableTemp);

  const tableWindContainer = createEl('div', 'table-responsive');
  const tableWind = createEl('table', 'table table-borderless table-fixed table-wind');

  const tableWindHeader = createEl('tr');
  const windFromH = createEl('th');
  windFromH.innerText = 'From';
  const windDirectionH = createEl('th');
  windDirectionH.innerText = 'Direction';
  const windSpeedH = createEl('th');
  windSpeedH.innerText = 'Speed';
  tableWindHeader.append(windFromH, windDirectionH, windSpeedH);

  const tableWindInfo = createEl('tr');
  const windFrom = createEl('td');
  windFrom.innerText = `${data.wind.directionText}`;

  const windDirection = createEl('td', 'icon-holder');
  const headingN = createEl('p', 'headings north');
  const headingS = createEl('p', 'headings south');
  const headingW = createEl('p', 'headings west');
  const headingE = createEl('p', 'headings east');
  headingN.innerText = 'N';
  headingS.innerText = 'S';
  headingW.innerText = 'W';
  headingE.innerText = 'E';
  const iconContainer = createEl('h1');
  const headingCompassIcon = createEl('i', `wi wi-wind from-${data.wind.deg}-deg`);
  iconContainer.append(headingCompassIcon);
  windDirection.append(headingN, headingS, headingW, headingE, iconContainer);

  const windSpeed = createEl('td');
  windSpeed.innerText = `${data.wind.speedText}`;
  tableWindInfo.append(windFrom, windDirection, windSpeed);

  tableWind.append(tableWindHeader, tableWindInfo);
  tableWindContainer.append(tableWind);

  const tableHumidityContainer = createEl('div', 'table-responsive');
  const tableHumidity = createEl('table', 'table table-borderless table-fixed table-humidity');

  const tableHumHeader = createEl('tr');
  const humidityH = createEl('th');
  humidityH.innerText = 'Humidity';
  const pressureH = createEl('th');
  pressureH.innerText = 'Pressure';
  tableHumHeader.append(humidityH, pressureH);

  const tableHumInfo = createEl('tr');
  const humidity = createEl('td');
  humidity.innerText = `% ${data.humidity}`;
  const pressure = createEl('td');
  pressure.innerText = `${data.pressure} hPa`;
  tableHumInfo.append(humidity, pressure);

  tableHumidity.append(tableHumHeader, tableHumInfo);
  tableHumidityContainer.append(tableHumidity);

  weatherCard.append(
    heading,
    location,
    mainIconContainer,
    temp,
    tableTempContainer,
    hr,
    tableWindContainer,
    hr2,
    tableHumidityContainer,
  );

  weatherCardContainer.appendChild(weatherCard);
  weatherCardContainer.classList.add('animate__animated', 'animate__fadeIn');
  row.appendChild(weatherCardContainer);
};

const displaySearchBar = () => {
  const mainContainer = document.getElementById('main-container');
  mainContainer.innerHTML = '';

  const searchContainer = createEl('div', 'col-6 animate__animated animate__zoomIn');
  searchContainer.setAttribute('id', 'search-container');

  const searchForm = createEl('form');
  searchForm.setAttribute('id', 'form');

  const formGroup = createEl('div', 'form-group');

  const inputGroup = createEl('div', 'input-group mb-3');

  const searchInput = createEl('input', 'form-control form-control-lg');
  searchInput.setAttribute('id', 'search-input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'E.g.: "City, CountryName"');

  const inputGroupA = createEl('div', 'input-group-append');
  const submitBtn = createEl('button', 'btn btn-outline-secondary btn-info');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.innerText = 'Find!';
  inputGroupA.append(submitBtn);

  const errorMessage = createEl('div', 'invalid-feedback');
  errorMessage.innerText = 'Please provide a valid city. The input should be "City Name, Country" or only "City Name".';

  inputGroup.append(searchInput, inputGroupA, errorMessage);
  formGroup.append(inputGroup);
  searchForm.append(formGroup);
  searchContainer.append(searchForm);
  mainContainer.append(searchContainer);
};

export {
  createWeatherCard,
  toggleSearchBar,
  toggleLoadingAnimation,
  displayErrorSearchBar,
};