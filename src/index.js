import "./style.scss";

import { drawForecastDataInHtml } from "./drawData";
import { getForecastByCityName, getForecastByGeolocation } from "./apiCalls";

let dayjs = require("dayjs");
require("dayjs/locale/pl");

const searchFieldValue = document.querySelector(".search-form__input");
const searchBtn = document.querySelector(".search-form__btn__search");
const locationBtn = document.querySelector(".search-form__btn__location");

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

// TODO use localstorage to save last picked latitude and longitude or city name
// TODO rwd
// TODO Chart reset function to draw updated data
