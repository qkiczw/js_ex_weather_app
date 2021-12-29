import "./style.scss";

import { drawForecastDataInHtml } from "./drawData";
import { getForecastByCityName, getForecastByGeolocation } from "./apiCalls";

let dayjs = require("dayjs");
require("dayjs/locale/pl");

const API_KEY = "dd5bbad88362bfa4029566ec28d36062";
const searchFieldValue = document.querySelector(".search-form__input");
const searchBtn = document.querySelector(".search-form__btn__search");
const locationBtn = document.querySelector(".search-form__btn__location");

searchBtn.addEventListener("click", showForecastByCityName);

function showForecastByCityName(e) {
  e.preventDefault();

  getForecastByCityName(searchFieldValue.value, API_KEY);
}

locationBtn.addEventListener("click", showForecatsByCoords);

function showForecatsByCoords(e) {
  e.preventDefault();

  getForecastByGeolocation(API_KEY);

  // navigator.geolocation.getCurrentPosition((succes) => {
  //   let { latitude, longitude } = succes.coords;
  //   console.log("Coords success: ", succes);

  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=pl&appid=${API_KEY}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       drawForecastDataInHtml(data);
  //       console.log("navData", data);
  //     })
  //     .catch((error) => console.log("error", error));
  // });
}

// TODO use localstorage to save last picked latitude and longitude
// TODO search by city name
// TODO rwd
