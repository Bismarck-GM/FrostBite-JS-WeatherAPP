import { getCountryName, getCountryCode } from './isoCountries';

const APIKEY = '49eaa4abf6e4f3d9db8f20bfed37ffca';

const windBeaufortToKmh = (windSpeed) => {
  // return (Math.round(0.836 * Math.sqrt(windSpeed ** 3) * 100) / 100) * 3.6; Beaufort to MS to KMH
  const speedRange = [
    '< 1 Km/h',
    '1-5 Km/h',
    '6-11 Km/h',
    '12-19 Km/h',
    '20-28 Km/h',
    '29-38 Km/h',
    '39-49 Km/h',
    '50-61 Km/h',
    '62-74 Km/h',
    '75-88 Km/h',
    '89-102 Km/h',
    '103-117 Km/h',
    '>= 118 Km/h',
  ];
  return speedRange[Math.round(windSpeed)];
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const splitCityCountryString = (string) => {
  const [cityName, countryName] = [string.split(',')[0].trim(), string.split(',')[1].trim()];
  return [cityName, countryName];
};

const capitalizeFirstLetterAllWords = (string) => {
  const splitStr = string.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i += 1) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

const processInputStringToApiCall = (inputString) => {
  let APICALL = '';
  if (inputString.indexOf(',') !== -1) {
    const strArr = splitCityCountryString(inputString);
    strArr[1] = getCountryCode(capitalizeFirstLetterAllWords(strArr[1]));
    APICALL = `https://api.openweathermap.org/data/2.5/weather?q=${strArr[0]},${strArr[1]}&appid=${APIKEY}`;
  }
  if (inputString.indexOf(',') === -1) {
    APICALL = `https://api.openweathermap.org/data/2.5/weather?q=${inputString}&appid=${APIKEY}`;
  }
  return APICALL;
};

const toTextualDescription = (degree) => {
  const sectors = [
    'Northerly',
    'North Easterly',
    'Easterly',
    'South Easterly',
    'Southerly',
    'South Westerly',
    'Westerly',
    'North Westerly'];
  degree += 22.5;

  if (degree < 0) {
    degree = (360 - Math.abs(degree)) % 360;
  } else {
    degree %= 360;
  }
  const which = parseInt(degree / 45, 10);
  return sectors[which];
};

const normalizeTempMetric = (temperature) => (temperature - 273.15).toFixed(1);

const normalizeTempFahrenheit = (temperatures) => (
  (normalizeTempMetric(temperatures) * (9 / 5) + 32)).toFixed(1);

const digestTemperaturesC = (temperatureObject) => {
  const response = {};
  Object.keys(temperatureObject).forEach((key) => {
    response[key] = normalizeTempMetric(temperatureObject[key]);
  });
  return response;
};

const digestTemperaturesF = (temperatureObject) => {
  const response = {};
  Object.keys(temperatureObject).forEach((key) => {
    response[key] = normalizeTempFahrenheit(temperatureObject[key]);
  });
  return response;
};

const destructData = (APIDATA) => {
  const [{ pressure, humidity, ...temperatures }, cityName, countryCode, weather, { wind }] = [
    APIDATA.main,
    APIDATA.name,
    APIDATA.sys.country,
    APIDATA.weather[0],
    APIDATA];
  const digestedData = {
    temperatures,
    pressure,
    humidity,
    cityName,
    countryCode,
    weather,
    wind,
  };
  return digestedData;
};

const normalizeApiData = (APIDATA) => {
  const data = destructData(APIDATA);
  data.temperaturesC = digestTemperaturesC(data.temperatures);
  data.temperaturesF = digestTemperaturesF(data.temperatures);
  data.countryName = getCountryName(data.countryCode);
  data.wind.speedText = windBeaufortToKmh(data.wind.speed);
  data.wind.directionText = toTextualDescription(data.wind.deg);
  data.weather.description = capitalizeFirstLetter(data.weather.description);
  return data;
};

const storeInLocal = (weatherInfo) => {
  localStorage.setItem('weather', JSON.stringify(weatherInfo));
};

export { normalizeApiData, processInputStringToApiCall, storeInLocal };