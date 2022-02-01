import "./style.scss";

import { getForecastByCityName, getForecastByGeolocation } from "./apiCalls";
import { dataFromLocalStorage } from "./localstorage";

let dayjs = require("dayjs");
require("dayjs/locale/pl");

const searchFieldValue = document.querySelector(".search__item__input");
const searchLabel = document.querySelector(".search__item__label");
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

searchFieldValue.addEventListener("keyup", function (e) {
  if (e.which == 13 || e.keyCode == 13) {
    getForecastByCityName(searchFieldValue.value);
  }
});

searchFieldValue.addEventListener("ontouchend", searchLabelHandler);
searchFieldValue.addEventListener("keyup", searchLabelHandler);
searchFieldValue.addEventListener("focus", searchLabelHandler);

function searchLabelHandler() {
  searchFieldValue.value.length !== 0
    ? searchLabel.classList.add("label-hidden")
    : searchLabel.classList.remove("label-hidden");
}

// TODO rwd
