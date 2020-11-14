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
