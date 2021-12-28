import "./style.scss";

import { drawForecastDataInHtml } from "./drawData";

let dayjs = require("dayjs");
require("dayjs/locale/pl");

console.log(dayjs(new Date()).locale("pl").format("dddd"));

const API_KEY = "dd5bbad88362bfa4029566ec28d36062";
const searchFieldValue = document.querySelector(".search-form__input");
const searchBtn = document.querySelector(".search-form__btn__search");
const locationBtn = document.querySelector(".search-form__btn__location");

searchBtn.addEventListener("click", showForecastByCityName);

function showForecastByCityName(e) {
  e.preventDefault();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchFieldValue.value}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely&units=metric&lang=pl&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          drawForecastDataInHtml(data);
        })
        .catch((error) => console.log("error", error));
    })
    .catch((error) => console.log("error", error));
}

locationBtn.addEventListener("click", showForecatsByCoords);

function showForecatsByCoords(e) {
  e.preventDefault();

  navigator.geolocation.getCurrentPosition((succes) => {
    let { latitude, longitude } = succes.coords;
    console.log(succes);

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=pl&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        drawForecastDataInHtml(data);
        console.log("navData", data);
      })
      .catch((error) => console.log("error", error));
  });
}

// TODO use localstorage to save last picked latitude and longitude
// TODO search by city name
// TODO rwd

// test field

// 1. Write a function to get Weather data from a city name;
