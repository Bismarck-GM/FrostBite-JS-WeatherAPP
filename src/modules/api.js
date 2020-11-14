const getWeather = async (CITYNAME) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITYNAME}&appid=49eaa4abf6e4f3d9db8f20bfed37ffca`);
    const APIDATA = await response.json();
    destructData(APIDATA);
    return APIDATA;
  } catch (err) {
    console.log(err);
  }
  return null;
};

const destructData = (APIDATA) => {
  const [{ pressure, humidity, ...temperatures }, cityName, countryName, weather, { wind }] = [
    APIDATA.main,
    APIDATA.name,
    APIDATA.sys.country,
    APIDATA.weather[0],
    APIDATA];
  console.log(temperatures, pressure, humidity, cityName, countryName, weather, wind);
};

export { getWeather, APIDATA };
