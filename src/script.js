
function displayWeather(response){
    console.log(response);
let temperature = Math.round(response.data.main.temp);
let city = response.data.name; 
let description= response.data.weather[0].main;
let currentHumidity=Math.round(response.data.main.humidity);
let currentWind=Math.round(response.data.wind.speed);



resultCity.innerHTML=`${city}`;
resultTemperature.innerHTML=`${temperature}`;
weatherDescription.innerHTML=`${description}`;
humidity.innerHTML=`${currentHumidity}`;
wind.innerHTML=`${currentWind}`;


}


function search(city){
    let apiKey = "fb4401bc73166e18f425a0d73e599b8e";
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
     axios.get(apiUrl).then(displayWeather);

}


function handleSubmit(event) {
  event.preventDefault();
    let city = document.querySelector("#input").value; 
   search(city);      
}

function displayWeather02(response) {
let currentLocation = response.data.list[0].name;
  let temperatureCurrentLocation = Math.round(response.data.list[0].main.temp);
  resultCity.innerHTML=`${currentLocation}`;
  resultTemperature.innerHTML=`${temperatureCurrentLocation}`;
}


function searchLocation(pos) {
  let latitude = pos.coords.latitude;
  let longitude = pos.coords.longitude;
  let units = "metric";
  let apiKey = "fb4401bc73166e18f425a0d73e599b8e";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/find";
  let apiUrl03 = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl03).then(displayWeather02);
}

function geoLocation(event) {
    event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}


function convertToFahrenheit(event){
event.preventDefault();
let temperatureElement =document.querySelector("#resultTemperature");
let temperature=temperatureElement.innerHTML;
temperature =Number(temperature);
 temperatureElement.innerHTML = Math.round((temperature* 9) / 5 + 32);
}
function convertToCelsius(event){
event.preventDefault();
let temperatureElement =document.querySelector("#resultTemperature");
let temperature=temperatureElement.innerHTML;
temperature =Number(temperature);
 temperatureElement.innerHTML = Math.round((temperature-32)*5/9);
}

//In your project, display the current date and time using JavaScript: Tuesday 16:00
let now = new Date();
let days =["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
let dayIndex = now.getDay();

let hours = now.getHours();
if (hours <10){
    hours=`0${hours}`;
}
let minutes = now.getMinutes();
if (minutes <10){
    minutes=`0${minutes}`;
}
let dayAndTime= document.querySelector("#dayTime");
dayAndTime.innerHTML=`${days[dayIndex]} ${hours} : ${minutes}`;

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

let fahrenheitButton = document.querySelector("#fahrenheitButton");
fahrenheitButton.addEventListener("click",convertToFahrenheit);

let celsiusButton = document.querySelector("#celsiusButton");
celsiusButton.addEventListener("click",convertToCelsius);



//Homewoork Week 5: On your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

let form = document.querySelector("#form-all");
form.addEventListener("submit", handleSubmit);

let geoLocationButton = document.querySelector("#geoLocationButton");
geoLocationButton.addEventListener("click",geoLocation);

search("Köln");







