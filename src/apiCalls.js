import { drawForecastDataInHtml } from "./drawData";

let forecastData = {
  name: "",
  lat: "",
  lon: "",
};

export async function getForecastByCityName(searchFieldVal, apiKey) {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchFieldVal}&appid=${apiKey}`
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
    `https://api.openweathermap.org/data/2.5/onecall?lat=${forecastData.lat}&lon=${forecastData.lon}&exclude=minutely&units=metric&lang=pl&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => (forecastData.forecast = data))
    .catch((error) => console.log("error", error));

  drawForecastDataInHtml(forecastData);
}

export async function getForecastByGeolocation(apiKey) {
  navigator.geolocation.getCurrentPosition((succes) => {
    let { latitude, longitude } = succes.coords;
    console.log(latitude, longitude);
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=pl&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => console.log("forecastdata: ", data))
      .catch((error) => console.log("error", error));

    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=adedf4d6425641f5a8e1fbff8da47505`
    )
      .then((response) => response.json())
      .then((data) => console.log("geoapify: ", data))
      .catch((error) => console.log("error", error));
  });
}
