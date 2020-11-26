import getCountryName from './isoCountries';

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

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

const switchStatus = () => {
  return document.getElementById('switch-measurement').checked;
};

const normalizeTempMetric = (temperature) => Math.floor(temperature / 10);

const normalizeTempFahrenheit = (temperatures) => (
  normalizeTempMetric(temperatures) * (9 / 5) + 32);

const digestTemperatures = (temperatureObject) => {
  const response = {};
  Object.keys(temperatureObject).forEach((key) => {
    if (switchStatus()) {
      response[key] = normalizeTempMetric(temperatureObject[key]);
    } else {
      response[key] = normalizeTempFahrenheit(temperatureObject[key]);
    }
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
  data.temperatures = digestTemperatures(data.temperatures);
  data.countryName = getCountryName(data.countryCode);
  data.wind.speedText = windBeaufortToKmh(data.wind.speed);
  data.wind.directionText = toTextualDescription(data.wind.deg);
  data.weather.description = capitalizeFirstLetter(data.weather.description);
  console.log(data);
  return data;
};

export default normalizeApiData;