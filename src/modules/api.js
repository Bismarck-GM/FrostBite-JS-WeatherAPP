import normalizeApiData from './functions';
import {
  createWeatherCard,
  toggleSearchBar,
  toggleLoadingAnimation,
  displayErrorSearchBar,
} from './dom';

const digestAPIDATA = async (APIDATA) => {
  try {
    const digestedData = normalizeApiData(APIDATA);
    toggleLoadingAnimation();
    createWeatherCard(digestedData);
  } catch (err) {
    toggleSearchBar();
    displayErrorSearchBar();
  }
  return null;
};

const getWeather = async (CITYNAME) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITYNAME}&appid=49eaa4abf6e4f3d9db8f20bfed37ffca`,
    );
    console.log(response);
    if (response.status !== 200) {
      toggleLoadingAnimation();
      toggleSearchBar();
      displayErrorSearchBar();
    } else {
      const APIDATA = await response.json();
    }
    return APIDATA;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default getWeather;
