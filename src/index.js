import "./style.scss";

import { getForecastByCityName, getForecastByGeolocation } from "./apiCalls";
import { dataFromLocalStorage } from "./localstorage";

let dayjs = require("dayjs");
require("dayjs/locale/pl");

const searchFieldValue = document.querySelector(".search__item__input");
const searchBtn = document.querySelector(".search__item__btn--city-name");
const locationBtn = document.querySelector(".search__item__btn--location");

// Getting data from LocalStorage - start
function showDataFromLocalStorage() {
  getForecastByCityName(dataFromLocalStorage.name);
}
showDataFromLocalStorage();
// Getting data from LocalStorage - end

searchBtn.addEventListener("click", showForecastByCityName);

function showForecastByCityName(e) {
  e.preventDefault();

  getForecastByCityName(searchFieldValue.value);
}

locationBtn.addEventListener("click", showForecatsByCoords);

function showForecatsByCoords(e) {
  e.preventDefault();

  getForecastByGeolocation();
}

// TODO rwd
// TODO Chart reset function to draw updated data
