import getCountryName from './isoCountries';

function windBeaufortToKmh(windSpeed) {
  // return (Math.round(0.836 * Math.sqrt(windSpeed ** 3) * 100) / 100) * 3.6; Beaufort to MS to KMH
  const speedRange = [
    '< 1',
    '1-5',
    '6-11',
    '12-19',
    '20-28',
    '29-38',
    '39-49',
    '50-61',
    '62-74',
    '75-88',
    '89-102',
    '103-117',
    '>= 118',
  ];
  return speedRange[Math.round(windSpeed)];
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function toTextualDescription(degree) {
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
}
