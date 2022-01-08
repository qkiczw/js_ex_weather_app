export function sendDataToLocalStorage(data) {
  console.log("Im sending!!!");
  console.log(data);
  localStorage.setItem("forecast", JSON.stringify(data));
}

export function getDataFromLocalStorage() {
  console.log("Im reading data from localStorage");
  console.log(JSON.parse(localStorage.getItem("forecast")));
}
