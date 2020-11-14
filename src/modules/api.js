import normalizeApiData from './functions';
import createWeatherCard from './dom';

const getWeather = async (CITYNAME) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITYNAME}&appid=49eaa4abf6e4f3d9db8f20bfed37ffca`,
    );
    const APIDATA = await response.json();
    createWeatherCard(normalizeApiData(APIDATA));
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default getWeather;
