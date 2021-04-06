function currentDate(timestamp){
let now = new Date(timestamp);
let days =["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
let dayIndex = now.getDay();
let date =now.getDate();
let year = now.getFullYear();
let months=["1","2","3","4","5","6","7","8","9","10","11","12",]
let monthIndex =now.getMonth();

let dayAndTime= document.querySelector("#dayTime");
dayAndTime.innerHTML=`${days[dayIndex]} ${date}.${months[monthIndex]}.${year} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
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
 
let currentLocation = response.data.list[0].name;
let description= response.data.list[0].weather[0].description;
let currentHumidity=Math.round(response.data.list[0].main.humidity);
let currentWind=Math.round(response.data.list[0].wind.speed);
let currentClouds=Math.round(response.data.list[0].clouds.all);
let icon = document.querySelector("#icon");

celsiusTemperature =Math.round(response.data.list[0].main.temp);

resultCity.innerHTML=`${currentLocation}`;
resultTemperature.innerHTML=`${celsiusTemperature}`;
weatherDescription.innerHTML=`${description}`;
humidity.innerHTML=`${currentHumidity}`;
wind.innerHTML=`${currentWind}`;
cloudiness.innerHTML=`${currentClouds}`;

icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.list[0].weather[0].description);
let now=Date.now();
currentDate(now);
}

function searchLocation(pos) {
let latitude = pos.coords.latitude;
let longitude = pos.coords.longitude;
let units = "metric";
let apiKey = "fb4401bc73166e18f425a0d73e599b8e";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/find";
let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    
axios.get(apiUrl).then(displayWeatherGeolocation)
  
let apiEndpointForecast = "https://api.openweathermap.org/data/2.5/forecast";
apiUrlForecast= `${apiEndpointForecast}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  
axios.get(apiUrlForecast).then(displayForecast);

let apiEndpointDayForecast ="https://api.openweathermap.org/data/2.5/onecall";
apiUrlDayForecast= `${apiEndpointDayForecast}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
axios.get(apiUrlDayForecast).then(displayDayForecast);
    
}
function geoLocation(event) {
    event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
;
}


function getDayForecast(coordinates){

let apiKey = "fb4401bc73166e18f425a0d73e599b8e";
let units = "metric";
let apiEndpointDayForecast ="https://api.openweathermap.org/data/2.5/onecall";
apiUrlDayForecast= `${apiEndpointDayForecast}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
axios.get(apiUrlDayForecast).then(displayDayForecast);
}

function displayWeather(response){  
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
"src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
icon.setAttribute("alt", response.data.weather[0].description);

let now=Date.now();
currentDate(now);
getDayForecast(response.data.coord);
}


function displayForecast(response){
 
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML=null;
 
for (let index =0; index < 4; index++){
let forecast = response.data.list[index];
let time = response.data.list[index].dt;
celsiusTemperatureForecast = Math.round(response.data.list[index].main.temp);
forecastElement.innerHTML += `
<div class="col-6 col-sm-3 col-md-3 col-lg timeslot">
<p>${formatHours(time*1000)}</p>
<img class="forecast-image" src ="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weather image of ${forecast.weather[0].description}" class="weather-icon"/>
<p>${forecast.weather[0].description}</p>            
<p>${Math.round(forecast.main.temp)}°</p>
</div>`;
} 
}

function formatDay(timestamp){
  let date = new Date(timestamp *1000);
  let day=date.getDay();
  let days =["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
return days[day];
}

function displayDayForecast(response){
  let forecast=response.data.daily;
  console.log(forecast);

let forecastElement=document.querySelector("#dayForecast");

let forecastHTML =`<div class="row weather-day-forecast" id="dayForecast">`;

forecast.forEach(function(forecastDay, index){
  if(index<8){
forecastHTML = 
forecastHTML +
`
<div class="col-6 col-sm-3 col-md-3 col-lg-3 timeslot">
  <p class="weather-forecast-day">${formatDay(forecastDay.dt)}
  </p>
  <img class="forecast-image" src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
        alt="weather image of ${forecastDay.weather[0].description}"
            class="weather-icon" />
  <p class="weather-forecast-description">${forecastDay.weather[0].description}</p>
  <p>
  <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span> <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span> </p>
</div>
`;
 } });
forecastHTML = forecastHTML +`</div>`;
forecastElement.innerHTML = forecastHTML;
}

function search(city){
let apiKey = "fb4401bc73166e18f425a0d73e599b8e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);

apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
event.preventDefault();
let city = document.querySelector("#input").value; 
search(city);      
}

let celsiusTemperature = null;


let form = document.querySelector("#form-all");
form.addEventListener("submit", handleSubmit);

let geoLocationButton = document.querySelector("#geoLocationButton");
geoLocationButton.addEventListener("click",geoLocation);

search("Köln");




