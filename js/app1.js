//js for wheater prodictor
let inputLocation = document.getElementById("locationInput");
let searchBtn = document.getElementById("searchButton");
let locationElement = document.getElementById("location");
let temperatureElement = document.getElementById("temperature");
let descriptionElement = document.getElementById("description");

searchButton.addEventListener('click', () => {
    let location = inputLocation.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    let url = ``
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            temperatureElement  = data
            descriptionElement = data

            // find what and how to pull the data for each element
        
        })
        .catch(error => {
            console.error(error);
        });
}

let Days = ["Sunday","Monday","Tuesday","Wensday","Thursday","Friday","Saturday"]
let TempLowDays = [,,,,,,];
let TempHighDays = [,,,,,,];
let WeatherDays = [,,,,,,];

function displayWeather(){
    let text = document.createElement("li");
    text = `
    <h3>${Days}</h3>
    <p>${TempLowDays}</p>
    <p>${TempHighDays}</p>
    <p>${WeatherDays}</p>
    `
}