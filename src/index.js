import './main.scss';
import getWeather from './modules/api';
import updateBackgroundsBasedOnNow from './modules/backgroundGradient';
import {
  toggleSearchBar,
  toggleLoadingAnimation,
  checkSearchBar,
  toggleTemps,
} from './modules/dom';

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
searchIcon.addEventListener('click', () => {
  checkSearchBar();
});

const switcher = document.getElementById('switch-measurement');
switcher.addEventListener('click', () => {
  toggleTemps();
});
updateBackgroundsBasedOnNow();
document.getElementById('search-input').focus();