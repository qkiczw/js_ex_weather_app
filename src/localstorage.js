export function sendDataToLocalStorage(data) {
  console.log("Im sending!!!");
  console.log(data);
  localStorage.setItem("forecast", JSON.stringify(data));
}
