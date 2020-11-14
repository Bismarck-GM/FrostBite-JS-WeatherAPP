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

  const row = document.getElementById('main-container');
  const col = createEl('div', 'col-12 col-md-6 col-lg-4');
  const weatherCard = createEl('div', 'weather-card');
  const wcTop = createEl('div', 'top');

  const wrapper = createEl('div', 'wrapper');

  const heading = createEl('h1', 'heading');
  heading.innerText = `${data.weather.description}`;

  const location = createEl('h3', 'location');
  location.innerText = `${data.cityName}, ${data.countryName}`;

  const mainIcon = createEl('i', `wi wi-owm-${data.weather.id}`);

  const temp = createEl('p', 'temp');
  const tempValue = createEl('span', 'temp-value');
  tempValue.innerText = `${data.temperatures.temp}`;
  const tempDegree = createEl('span', 'deg');
  tempDegree.innerText = '°';

  temp.append(tempValue, tempDegree, tempType);

  const tableTemp = createEl('table', 'table-temp');
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

  const tableHumidity = createEl('table', 'table-humidity');

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

  const windTitle = createEl('h4');
  windTitle.innerText = 'Wind';
  const windIcon = createEl('i', `wi wi-wind from-${data.wind.deg}-deg`);

  const tableWind = createEl('table', 'table-wind');

  const tableWindHeader = createEl('tr');
  const windDirectionH = createEl('th');
  windDirectionH.innerText = 'From';
  const windSpeedH = createEl('th');
  windSpeedH.innerText = 'Speed';
  tableWindHeader.append(windDirectionH, windSpeedH);

  const tableWindInfo = createEl('tr');
  const windDirection = createEl('td');
  windDirection.innerText = `${data.wind.directionText}`;
  const windSpeed = createEl('td');
  windSpeed.innerText = `${data.wind.speedText}`;
  tableWindInfo.append(windDirection, windSpeed);

  tableWind.append(tableWindHeader, tableWindInfo);

  wrapper.append(
    heading,
    location,
    mainIcon,
    temp,
    tableTemp,
    hr,
    tableHumidity,
    hr,
    windTitle,
    windIcon,
    tableWind,
  );

  wcTop.appendChild(wrapper);
  weatherCard.appendChild(wcTop);
  col.appendChild(weatherCard);
  row.appendChild(col);
};

export default createWeatherCard;