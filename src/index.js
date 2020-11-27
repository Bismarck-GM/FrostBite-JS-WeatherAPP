import './main.scss';
import getWeather from './modules/api';
import { setCSSGradientByIndex, updateTime } from './modules/backgroundGradient';
import { toggleSearchBar, toggleLoadingAnimation } from './modules/dom';

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  toggleSearchBar();
  toggleLoadingAnimation();
  const inputValue = document.getElementById('search-input');
  localStorage.setItem('cityName', JSON.stringify(inputValue.value));
  getWeather(inputValue.value);
  inputValue.value = '';
});

const switcher = document.getElementById('switch-measurement');

setCSSGradientByIndex(updateTime());