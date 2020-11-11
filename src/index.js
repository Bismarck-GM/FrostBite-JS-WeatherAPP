const APIKEY = '49eaa4abf6e4f3d9db8f20bfed37ffca';

// const WEBAPI = `api.openweathermap.org/data/2.5/weather?q=${CITYNAME}&appid=${APIKEY}`;

async function getWeather(CITYNAME, APIKEY) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITYNAME}&appid=${APIKEY}`);
    const weatherData = await response.json();
    console.log(weatherData);
  }
  catch (err) {
    console.log(err);
  }
}

getWeather('Cordoba', APIKEY);
