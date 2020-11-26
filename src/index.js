import './main.scss';
import getWeather from './modules/api';

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  // animateCSS('search-container', 'fadeOut');
  event.preventDefault();
  const inputValue = document.getElementById('search-input');
  getWeather(inputValue.value);
  inputValue.value = '';
  document.getElementById('search-container').classList.add('d-none');
});

const switcher = document.getElementById('switch-measurement');
