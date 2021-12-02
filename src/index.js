import "./style.scss";
console.log("hello world!");

const API_KEY = "dd5bbad88362bfa4029566ec28d36062";
const searchFieldValue = document.querySelector(".search-form__input");
const searchBtn = document.querySelector(".search-form__btn__search");
const locationBtn = document.querySelector(".search-form__btn__location");

const weekWeatherContainer = document.querySelector(".week-weather__container");

locationBtn.addEventListener("click", setUserLocation);

function setUserLocation(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition((succes) => {
    let { latitude, longitude } = succes.coords;
    console.log(succes);

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=pl&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        showWeaterData(data);
      })
      .catch((error) => console.log("error", error));
  });
}

function showWeaterData(data) {
  console.log(data);

  let { temp, pressure, humidity, wind_speed, dt } = data.current;
  let { icon, description } = data.current.weather[0];

  let chartHours = data.hourly.map((item) =>
    moment(item.dt * 1000).format("HH:mm")
  );
  let hourlyTempValues = data.hourly.map((item) => item.temp);
  let hourlyTempValuesFellsLike = data.hourly.map((item) => item.feels_like);

  const defaultChartValues = [...new Array(48).fill(1)];

  document.querySelector(".current-temp__temp").innerHTML = `${Math.round(
    temp
  )} &#8451;`;
  document.querySelector(".current-temp__desc").innerHTML = description;
  document.querySelector(
    ".current-temp__icon"
  ).src = `http://openweathermap.org/img/wn//${icon}@2x.png`;
  document.querySelector(".current-temp__pressure").innerHTML = pressure;
  document.querySelector(".current-temp__humidity").innerHTML = humidity;
  document.querySelector(".current-temp__wind").innerHTML = wind_speed;
  document.querySelector(".current-temp__time").innerHTML = moment(
    dt * 1000
  ).format("HH:mm");

  // chart.js config
  const config = {
    type: "bar",
    data: {
      labels: chartHours,
      datasets: [
        {
          label: "Punkt środkowy",
          data: hourlyTempValues,
          backgroundColor: "blue",
        },
        {
          label: "Odczuwalna",
          data: hourlyTempValuesFellsLike,
          backgroundColor: "green",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  const myChart = new Chart(document.getElementById("hourlyTempChart"), config);

  // let xxx = data.daily.map((day) => day.temp);
  data.daily.forEach((day) => {
    let { icon } = day.weather[0];
    let singleDayItem = document.createElement(`div`);
    singleDayItem.classList.add("week-weather__item");
    singleDayItem.innerHTML = `
    <div class="week-weather__item__day">${moment(day.dt * 1000).format(
      "dddd"
    )}</div>
    <div class="week-weather__item__icon">
      <img src="http://openweathermap.org/img/wn//${icon}@2x.png" />
    </div>
    <div class="week-weather__item__temp--day">Dzień: <span>${Math.round(
      day.temp.day
    )}</span> C</div>
    <div class="week-weather__item__temp--night">Noc: <span>${Math.round(
      day.temp.night
    )}</span> C</div>
    `;
    weekWeatherContainer.appendChild(singleDayItem);
  });
}
