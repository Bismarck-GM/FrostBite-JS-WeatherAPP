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
          <span class="deg">0</span>
          <a href="javascript:;"><span class="temp-type">C</span></a>
        </p>
        <h4>Feels Like</h4>
        <h5>Max. Temp</h5>
        <h5>Min. Temp</h5>
        <hr>
        <h4>Wind</h4>
        <i class="wi wi-wind from-360-deg"></i>
        <h5>From: </h5>
        <h5>Speed: </h5>
      </div>
    </div>
  </div>
</div>
</div> */
import getCountryName from './isoCountries';

const createWeatherCard = (digestedApiData) => {
  const row = document.createElement('div');
  row.classList.add('row', 'h-100', 'align-items-center', 'justify-content-center', 'm-0', 'position-absolute');
  const col = document.createElement('div').classList.add('col-12', 'col-md-6', 'col-lg-4');
  const weatherCard = document.createElement('div').classList.add('weather-card');
  const wcTop = document.createElement('div').classList.add('top');

  const wrapper = document.createElement('div').classList.add('wrapper');
  const heading = document.createElement('h1').classList.add('heading');
  const location = document.createElement('h3').classList.add('location');
  const temp = document.createElement('p').classList.add('temp');
  const tempValue = document.createElement('span').classList.add('temp-value');
  const tempDegree = document.createElement('span').classList.add('deg');

};

function toTextualDescription(degree) {
  const sectors = [
    'Northerly',
    'North Easterly',
    'Easterly',
    'South Easterly',
    'Southerly',
    'South Westerly',
    'Westerly',
    'North Westerly'];
  degree += 22.5;

  if (degree < 0) {
    degree = (360 - Math.abs(degree)) % 360;
  } else {
    degree %= 360;
  }
  const which = parseInt(degree / 45, 10);
  return sectors[which];
}

function windBeaufortToKmh(windSpeed) {
  // return (Math.round(0.836 * Math.sqrt(windSpeed ** 3) * 100) / 100) * 3.6; Beaufort to MS to KMH
  const speedRange = [
    '< 1',
    '1-5',
    '6-11',
    '12-19',
    '20-28',
    '29-38',
    '39-49',
    '50-61',
    '62-74',
    '75-88',
    '89-102',
    '103-117',
    '>= 118',
  ];
  return speedRange[Math.round(windSpeed)];
}