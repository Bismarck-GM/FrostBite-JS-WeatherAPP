import { normalizeApiData, processInputStringToApiCall, storeInLocal } from './functions';
import {
  createWeatherCard,
  toggleSearchBar,
  toggleLoadingAnimation,
  displayErrorSearchBar,
} from './dom';

const digestAPIDATA = (APIDATA) => {
  const digestedData = normalizeApiData(APIDATA);
  toggleLoadingAnimation();
  storeInLocal(digestedData);
  createWeatherCard();
};

const getWeather = async (inputString) => {
  const APICALL = processInputStringToApiCall(inputString);
  try {
    const response = await fetch(APICALL);
    if (response.status !== 200) {
      toggleLoadingAnimation();
      toggleSearchBar();
      displayErrorSearchBar();
    } else {
      const APIDATA = await response.json();
      digestAPIDATA(APIDATA);
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default getWeather;
