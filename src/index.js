import "./style.scss";
console.log("hello world!");

const API_KEY = "dd5bbad88362bfa4029566ec28d36062";
const searchFieldValue = document.querySelector(".search-form__input");
const searchBtn = document.querySelector(".search-form__btn__search");
const locationBtn = document.querySelector(".search-form__btn__location");

locationBtn.addEventListener("click", setUserLocation);

function setUserLocation(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition((succes) => {
    let { latitude, longitude } = succes.coords;
    console.log(latitude, longitude);

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&lang=pl&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("error", error));
  });
}
