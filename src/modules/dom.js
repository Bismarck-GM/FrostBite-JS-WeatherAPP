const fetchFromLocal = () => JSON.parse(localStorage.getItem('weather'));

const toggleSearchBar = () => {
  const searchBar = document.getElementById('search-container');
  if (searchBar.classList.contains('animate__zoomIn')) {
    searchBar.classList.remove('animate__zoomIn');
    searchBar.style.setProperty('--animate-duration', '.5s');
    searchBar.classList.add('animate__fadeOut');
  } else {
    searchBar.classList.remove('animate__fadeOut');
    searchBar.style.setProperty('--animate-duration', '1s');
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

const appendTemps = () => {
  const data = fetchFromLocal();
  const tempType = document.querySelector('.temp-type');
  const tempValue = document.querySelector('.temp-value');
  const feelsLike = document.getElementById('feels-like');
  const maxTemp = document.getElementById('max-temp');
  const minTemp = document.getElementById('min-temp');
  if (switchStatus()) {
    tempType.innerText = getTempSign();
    tempValue.innerText = `${data.temperaturesC.temp}`;
    feelsLike.innerText = `${data.temperaturesC.feels_like} °${getTempSign()}`;
    maxTemp.innerText = `${data.temperaturesC.temp_max} °${getTempSign()}`;
    minTemp.innerText = `${data.temperaturesC.temp_min} °${getTempSign()}`;
  } else {
    tempType.innerText = getTempSign();
    tempValue.innerText = `${data.temperaturesF.temp}`;
    feelsLike.innerText = `${data.temperaturesF.feels_like} °${getTempSign()}`;
    maxTemp.innerText = `${data.temperaturesF.temp_max} °${getTempSign()}`;
    minTemp.innerText = `${data.temperaturesF.temp_min} °${getTempSign()}`;
  }
};

const createWeatherCard = () => {
  const data = fetchFromLocal();
  const sup = document.createElement('sup');
  sup.innerText = '°';

  const tempType = createEl('span', 'temp-type');

  const hr = document.createElement('hr');
  const hr2 = document.createElement('hr');

  const row = document.getElementById('main-container');
  const searchBar = document.getElementById('search-container');
  searchBar.classList.add('d-none');
  const weatherCardContainer = createEl('div', 'card weather-card-container text-center col-10 col-md-6 col-lg-4');
  const weatherCard = createEl('div', 'card-body');
  const heading = createEl('h1', 'card-title');
  heading.innerText = `${data.weather.description}`;

  const location = createEl('h3', 'card-subtitle mb-2');
  location.innerText = `${data.cityName}, ${data.countryName}`;

  const mainIconContainer = createEl('h1', 'card-title');
  const mainIcon = createEl('i', `wi wi-owm-${data.weather.id}`);
  mainIconContainer.append(mainIcon);

  const temp = createEl('h1', 'temp');
  const tempValue = createEl('span', 'temp-value');
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
  feelsLike.setAttribute('id', 'feels-like');
  const maxTemp = createEl('td');
  maxTemp.setAttribute('id', 'max-temp');
  const minTemp = createEl('td');
  minTemp.setAttribute('id', 'min-temp');
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
  humidity.innerText = `${data.humidity}%`;
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
  row.appendChild(weatherCardContainer);
  appendTemps(data);
  weatherCardContainer.classList.add('animate__animated', 'animate__fadeIn');
  tableHumidityContainer.classList.add('animate__animated', 'animate__fadeInUp');
  tableWindContainer.classList.add('animate__animated', 'animate__fadeInRight');
  tableTempContainer.classList.add('animate__animated', 'animate__fadeInLeft');
};

// Create a new SearchBar - Deprecated //
// const displaySearchBar = () => {
//   const mainContainer = document.getElementById('main-container');
//   mainContainer.innerHTML = '';

//   const searchContainer = createEl('div', 'col-6 animate__animated animate__zoomIn');
//   searchContainer.setAttribute('id', 'search-container');

//   const searchForm = createEl('form');
//   searchForm.setAttribute('id', 'form');

//   const formGroup = createEl('div', 'form-group');

//   const inputGroup = createEl('div', 'input-group mb-3');

//   const searchInput = createEl('input', 'form-control form-control-lg');
//   searchInput.setAttribute('id', 'search-input');
//   searchInput.setAttribute('type', 'text');
//   searchInput.setAttribute('placeholder', 'E.g.: "City, CountryName"');

//   const inputGroupA = createEl('div', 'input-group-append');
//   const submitBtn = createEl('button', 'btn btn-outline-secondary btn-info');
//   submitBtn.setAttribute('type', 'submit');
//   submitBtn.innerText = 'Find!';
//   inputGroupA.append(submitBtn);

//   const errorMessage = createEl('div', 'invalid-feedback');
//   errorMessage.innerText = 'Please provide a valid c.

//   inputGroup.append(searchInput, inputGroupA, errorMessage);
//   formGroup.append(inputGroup);
//   searchForm.append(formGroup);
//   searchContainer.append(searchForm);
//   mainContainer.append(searchContainer);
// };

const checkSearchBar = () => {
  const searchBar = document.getElementById('search-container');
  const weatherCardContainer = document.querySelector('.weather-card-container');
  if (searchBar.classList.contains('d-none')) {
    toggleSearchBar();
    searchBar.classList.remove('d-none');
    weatherCardContainer.remove();
  } else {
    document.getElementById('search-input').focus();
  }
};

const toggleTemps = () => {
  const weatherCard = document.querySelector('.card-body');
  if (weatherCard != null) {
    appendTemps();
  }
};

export {
  createWeatherCard,
  toggleSearchBar,
  toggleLoadingAnimation,
  displayErrorSearchBar,
  checkSearchBar,
  toggleTemps,
};