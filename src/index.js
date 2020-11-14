import './main.scss';
import getWeather from './modules/api';

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputValue = document.getElementById('search-input');
  getWeather(inputValue.value);
  inputValue.value = '';
  document.getElementById('search-container').classList.add('d-none');
});

const switcher = document.getElementById('switch-measurement');

// switcher.addEventListener('click', () => {
//   console.log(switcher.checked);
// });

// {coord: {…}, weather: Array(1), base: "stations", main: {…}, visibility: 10000, …}
// base: "stations"
// clouds: {all: 10}
// cod: 200
// coord: {lon: -60.7, lat: -31.63}
// dt: 1605125678
// id: 3836277
// main: {temp: 303.51, feels_like: 302.64, temp_min: 302.59, temp_max: 304.26, pressure: 1009, …}
// name: "Santa Fe"
// sys: {type: 3, id: 2008823, country: "AR", sunrise: 1605085064, sunset: 1605134171}
// timezone: -10800
// visibility: 10000
// weather: Array(1)
// 0:
// description: "clear sky"
// icon: "01d"
// id: 800
// main: "Clear"
// __proto__: Object
// length: 1
// __proto__: Array(0)
// wind: {speed: 2.24, deg: 17, gust: 3.58}
// __proto__: Object
