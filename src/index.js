import './main.scss';
import getWeather from './modules/api';
import updateBackgroundsBasedOnNow from './modules/backgroundGradient';
import { toggleSearchBar, toggleLoadingAnimation, checkSearchBar } from './modules/dom';

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  toggleSearchBar();
  toggleLoadingAnimation();
  const inputValue = document.getElementById('search-input');
  getWeather(inputValue.value);
  inputValue.value = '';
});

const searchIcon = document.getElementById('search-icon');
searchIcon.addEventListener('click', (e) => {
  // console.log(e);
  checkSearchBar();
});

const switcher = document.getElementById('switch-measurement');

updateBackgroundsBasedOnNow();