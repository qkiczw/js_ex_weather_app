import { drawForecastDataInHtml } from "./drawData";

const API_KEYS = {
  openweather: "dd5bbad88362bfa4029566ec28d36062",
  geoapify: "adedf4d6425641f5a8e1fbff8da47505",
};

let forecastData = {
  name: "",
  lat: "",
  lon: "",
};

export async function getForecastByCityName(searchFieldVal) {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchFieldVal}&appid=${API_KEYS.openweather}`
  )
    .then((response) => response.json())
    .then((data) => {
      forecastData = {
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
      };
    })
    .catch((error) => console.log("error: ", error));

  await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${forecastData.lat}&lon=${forecastData.lon}&exclude=minutely&units=metric&lang=pl&appid=${API_KEYS.openweather}`
  )
    .then((response) => response.json())
    .then((data) => (forecastData.forecast = data))
    .catch((error) => console.log("error", error));

  drawForecastDataInHtml(forecastData);
}

export function getForecastByGeolocation() {
  navigator.geolocation.getCurrentPosition((succes) => {
    let { latitude, longitude } = succes.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=pl&appid=${API_KEYS.openweather}`
    )
      .then((response) => response.json())
      .then((data) => (forecastData.forecast = data))
      .catch((error) => console.log("error", error));

    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${API_KEYS.geoapify}`
    )
      .then((response) => response.json())
      .then((data) => (forecastData.name = data.results[0].city))
      .catch((error) => console.log("error", error));
  });

  drawForecastDataInHtml(forecastData);
}
