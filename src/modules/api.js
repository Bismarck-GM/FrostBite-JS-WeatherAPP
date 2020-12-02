import { normalizeApiData, processInputStringToApiCall, storeInLocal } from './functions';
import {
  createWeatherCard,
  toggleSearchBar,
  toggleLoadingAnimation,
  toggleErrorSearchBar,
} from './dom';

const digestAPIDATA = (APIDATA) => {
  const digestedData = normalizeApiData(APIDATA);
  toggleLoadingAnimation();
  storeInLocal(digestedData);
  createWeatherCard();
};

const getWeather = async (inputString) => {
  const APICALL = processInputStringToApiCall(inputString);
  if (APICALL.length === 0) {
    toggleLoadingAnimation();
    toggleSearchBar();
    toggleErrorSearchBar(true);
  } else {
    try {
      const response = await fetch(APICALL);
      if (response.status !== 200) {
        toggleLoadingAnimation();
        toggleSearchBar();
        toggleErrorSearchBar(true);
      } else {
        const APIDATA = await response.json();
        toggleErrorSearchBar(false);
        digestAPIDATA(APIDATA);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
  return null;
};

export default getWeather;
