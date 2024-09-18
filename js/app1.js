//js for weather prodictor

//clears page 
let display = document.getElementById("dispayWeather");
let ClearButton = document.getElementById("ClearBtn");
ClearButton.addEventListener("click",()=>{
    display.innerHTML = "";
})


// GET COORDINATES
const findMe = () => {
    let success = (position) => {
        console.log(position);
        status.textContent = "success";
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude,longitude);
    };
    let error = () => {
        console.log(error)
        confirm("Geolocation is not supported by this browser.");  
    };
    navigator.geolocation.getCurrentPosition(success, error);
};

findMe()







async function fetchWeather(latitude,longitude) {
    let url = `https://api.weather.gov/points/${latitude},${longitude}`
    //variables
    let state;
    let City;
    let station;
    
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //get data
            state = data.properties.relativeLocation.properties.state
            City = data.properties.relativeLocation.properties.city
            const { gridId, gridX, gridY } = data.properties;
            fetchTemp(gridId, gridX, gridY);

            DisplayInfo(City,state);
            // find what and how to pull the data for each element
        
        })
        .catch(error => {
            console.error(error);
        });
}//end fucnton to featch data
async function fetchTemp(NewStaiton,latitude,longitude) {
    let url = `https://api.weather.gov/gridpoints/${NewStaiton}/${latitude},${longitude}/forecast`
    //varables
    let day;
    let Temp;
    let TempType;
    let WindSpeed;
    let windDirection
    let CurrentImg;
    let CurrentForcast;
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //get data
        for(let i = 0; i<data.properties.periods.length;i++){
            //get data
            day = data.properties.periods[i].name
            Temp = data.properties.periods[i].temperature
            TempType = data.properties.periods[i].temperatureUnit
            WindSpeed = data.properties.periods[i].windSpeed
            windDirection = data.properties.periods[i].windDirection
            CurrentImg = data.properties.periods[i].icon
            CurrentForcast = data.properties.periods[i].shortForecast
            //display each time
            displayWeather(day,Temp,TempType,WindSpeed,windDirection,CurrentImg,CurrentForcast);
            
        }//end for loop 
        // staion == NewsSatioan

        
        // find what and how to pull the data for each element
    
    })
    .catch(error => {
        console.error(error);
    });
}//end funtion fetch weather





let TempDisplay = document.querySelector(".dBorder");
//functions to dipaly evyerthign

// funcition to dispaly the weather
function displayWeather(Days,temperature,tempType,windSpeed,dirct,imgFor,forecast){
    //dispaly temps and forcast
    ChangeColor(temperature)
        // temps and day display
        let LiDisplayTemp = document.createElement("li");
        LiDisplayTemp.innerHTML = `
        <div class="row" id="days">
            <h1 class="col-12" id="first">${Days}</h1>
            <div class="col-8 row" id="first">
                <h1 class="col-12">
                    <span class="col-6">${temperature}</span>
                    <span class="col-6">${tempType}</span>
                </h1>
                <span class="col-12">Wind Speed - ${windSpeed}</span>
                <span class="col-12">Wind Direction - ${dirct}</span>
                <span class="col-12">${forecast}</span>
            </div>
            <img class="col-4" src="${imgFor}" id="ForcastImg" alt="weath forcst">
        </div>
        `;
        
        TempDisplay.appendChild(LiDisplayTemp);
}//end funtion
function DisplayInfo(city1,state1){
    //dispaly city and state
    let CityDisplay = document.querySelector(".InfoBorder");
    let LiDisplayInfo = document.createElement("li");
    LiDisplayInfo.innerHTML = `
        <div class="row" id="Info">
            <h1 class="col-12">${city1}, ${state1}</h1>
        </div>
    `
    CityDisplay.appendChild(LiDisplayInfo);
}//end futnito diaplya city and state




//functions for vistual diaplays

// function to change color
function ChangeColor(Temp){
    if (Temp <= 32){
        TempDisplay.style.color = "#0d6efd";
    } else if(Temp >= 98){
       TempDisplay.style.color = "red";
    } else {
        TempDisplay.style.color = "#ffda6a";
    };
}//end fucntion change color
 
