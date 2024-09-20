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
    let TempType;

    // day time
    let Temp;
    let WindSpeed;
    let windDirection
    let CurrentImg;
    let CurrentForcast;

    // night time
    let TempLow;
    let NightWindSpeed;
    let NightwindDirection;
    let NightForcast;
    let NightImg;

    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //get data
        for(let i = 0; i<data.properties.periods.length;i++){
            if(data.properties.periods[i].isDaytime === true){
                
                //day
                let d = i;
                day = data.properties.periods[d].name
                Temp = data.properties.periods[d].temperature
                TempType = data.properties.periods[d].temperatureUnit
                WindSpeed = data.properties.periods[d].windSpeed
                windDirection = data.properties.periods[d].windDirection
                CurrentImg = data.properties.periods[d].icon
                CurrentForcast = data.properties.periods[d].shortForecast
                
                //night
                let n = i;
                TempLow = data.properties.periods[n+1].temperature
                NightWindSpeed = data.properties.periods[n+1].windSpeed
                NightwindDirection = data.properties.periods[n+1].windDirection
                NightImg = data.properties.periods[n+1].icon
                NightForcast = data.properties.periods[n+1].shortForecast
            }
            else{

                displayWeather(day,Temp,TempLow,TempType,WindSpeed,windDirection,NightWindSpeed,NightwindDirection,CurrentImg,NightImg,CurrentForcast,NightForcast);
            }
                
        }//end for loop
        // find what and how to pull the data for each element
    
    })
    .catch(error => {
        console.error(error);
    });
}//end funtion fetch weather


let TempDisplay = document.querySelector(".dBorder");
//functions to dipaly evyerthign

// funcition to dispaly the weather
function displayWeather(Days,temperature,tempLow,tempType,windSpeed,dirct,NwindSpeed,Ndirect,imgFor,NimgFor,forecast,Nforecast){
    //dispaly temps and forcast
    ChangeColor(temperature,tempLow)
        // temps and day display
        let LiDisplayTemp = document.createElement("li");
        LiDisplayTemp.innerHTML = `
        <div class="row" id="days">
        <div class="col-12 row">
            <h1 class="col-7" id="first">${Days}</h1>
            <h2 class="col-5">${temperature} - ${tempLow} ${tempType}</h2>
        </div>
        <div class="col-12 row" id="first">
            <h5 class="col-12"> -===- Day -===-</h5>
            <div class="col-9 row" id="text">
                <span class="col-12">Wind Speed - ${windSpeed}</span>
                <span class="col-12">Wind Direction - ${dirct}</span>
                <span class="col-12">Forecast - ${forecast}</span>
            </div>
            <img class="col-3" src="${imgFor}" id="ForcastImg" alt="weath forcst">
        </div> 
        <div class="col-12 row" id="second"> 
            <h5 class="col-12"> -===- Night -===-</h5>
            <div class="col-9 row" id="text">
                <span class="col-12">Wind Speed - ${NwindSpeed}</span>
                <span class="col-12">Wind Direction - ${Ndirect}</span>
                <span class"col-12">Forecast - ${Nforecast}</span>
            </div>
            <img class="col-3" src="${NimgFor}" id="ForcastImg" alt="weath forcst">    
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
function ChangeColor(TempH,TempL){
    if (TempH <= 32 || TempL <= 32){
        TempDisplay.style.color = "#0d6efd";
    } else if(TempH >= 98 || TempH >= 98){
       TempDisplay.style.color = "red";
    } else {
        TempDisplay.style.color = "#ffda6a";
    };
}//end fucntion change color
 
