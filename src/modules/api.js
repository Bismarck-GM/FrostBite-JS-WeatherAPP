import { normalizeApiData, processInputStringToApiCall } from './functions';
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
      console.log(APIDATA);
      digestAPIDATA(APIDATA);
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default getWeather;
