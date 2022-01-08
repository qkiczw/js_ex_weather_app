export let dataFromLocalStorage = {};

export function sendDataToLocalStorage(data) {
  localStorage.setItem("forecast", JSON.stringify(data));
}

function getDataFromLocalStorage() {
  if (JSON.parse(localStorage.getItem("forecast")) === null) {
    dataFromLocalStorage = {
      name: "warszawa",
      lat: "52.23117286550588",
      lon: "21.011062983790552",
    };
  } else {
    let data = JSON.parse(localStorage.getItem("forecast"));

    dataFromLocalStorage = {
      name: data.name,
      lat: data.lat,
      lon: data.lon,
    };
  }
}

getDataFromLocalStorage();
