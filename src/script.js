
function currentDate(){
let now = new Date();
let days =["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
let dayIndex = now.getDay();

let dayAndTime= document.querySelector("#dayTime");
dayAndTime.innerHTML=`${days[dayIndex]} ${formatHours()}`;

}

function formatHours() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}



function displayWeatherGeolocation(response) {
  console.log(response);

 
let currentLocation = response.data.list[0].name;
let temperatureCurrentLocation = Math.round(response.data.list[0].main.temp);
let description= response.data.list[0].weather[0].description;
let currentHumidity=Math.round(response.data.list[0].main.humidity);
let currentWind=Math.round(response.data.list[0].wind.speed);
let currentClouds=Math.round(response.data.list[0].clouds.all);
let icon = document.querySelector("#icon");




resultCity.innerHTML=`${currentLocation}`;
resultTemperature.innerHTML=`${temperatureCurrentLocation}`;
weatherDescription.innerHTML=`${description}`;
humidity.innerHTML=`${currentHumidity}`;
wind.innerHTML=`${currentWind}`;
cloudiness.innerHTML=`${currentClouds}`;

icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.list[0].weather[0].description);
currentDate();
}

function searchLocation(pos) {
  let latitude = pos.coords.latitude;
  let longitude = pos.coords.longitude;
  let units = "metric";
  let apiKey = "fb4401bc73166e18f425a0d73e599b8e";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/find";
  let apiUrl03 = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl03).then(displayWeatherGeolocation);
}

function geoLocation(event) {
    event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}






function displayWeather(response){
  console.log(response);

let city = response.data.name; 
let description= response.data.weather[0].description;
let currentHumidity=Math.round(response.data.main.humidity);
let currentWind=Math.round(response.data.wind.speed);
let currentClouds=Math.round(response.data.clouds.all);
let icon = document.querySelector("#icon");


celsiusTemperature =Math.round(response.data.main.temp);

resultCity.innerHTML=`${city}`;
resultTemperature.innerHTML=`${celsiusTemperature}`;
weatherDescription.innerHTML=`${description}`;
humidity.innerHTML=`${currentHumidity}`;
wind.innerHTML=`${currentWind}`;
cloudiness.innerHTML=`${currentClouds}`;

icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
currentDate();
}






function search(city){
    let apiKey = "fb4401bc73166e18f425a0d73e599b8e";
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

     axios.get(apiUrl).then(displayWeather);
}


function handleSubmit(event) {
  event.preventDefault();
    let city = document.querySelector("#input").value; 
   search(city);      
}


function convertToFahrenheit(event){
event.preventDefault();
let temperatureElement =document.querySelector("#resultTemperature");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
temperatureElement.innerHTML = Math.round((celsiusTemperature* 9) / 5 + 32);
}


function convertToCelsius(event){
event.preventDefault();
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
let temperatureElement =document.querySelector("#resultTemperature");
 temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;

let form = document.querySelector("#form-all");
form.addEventListener("submit", handleSubmit);

let geoLocationButton = document.querySelector("#geoLocationButton");
geoLocationButton.addEventListener("click",geoLocation);

let fahrenheitLink = document.querySelector("#fahrenheitButton");
fahrenheitLink.addEventListener("click",convertToFahrenheit);

let celsiusLink = document.querySelector("#celsiusButton");
celsiusLink.addEventListener("click",convertToCelsius);


search("Köln");







