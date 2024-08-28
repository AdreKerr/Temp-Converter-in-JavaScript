let InputNum = document.getElementById("TempNum");

let Temp1Chosen = document.getElementById("Temp1");
let Temp2Chosen = document.getElementById("Temp2");
let Temp3Chosen = document.getElementById("Temp3");

let clearButton = document.getElementById("clear");

let DisplayTemp = document.querySelectorAll(".displayTemp ul");

Temp1Chosen.addEventListener("click", Kelvin);
Temp2Chosen.addEventListener("click", Fahrenheit);
Temp3Chosen.addEventListener("click", Celsius);
 
clearButton.addEventListener("click",()=>{
    for (let i = 0; i < DisplayTemp.length; i++) {
        const element = DisplayTemp[i];
        DisplayTemp[i].innerHTML = "";
    }//end for loop
    InputNum.value = "";
    document.getElementById("big").style.backgroundColor = "whitesmoke";
    img.src = "";
})



// funtions to convert temps
// varable
let F = "";
let C = "";
let K = "";

function Kelvin(){
    //calculation
    img.src = "";
    K = InputNum.value;
    C = (K - 273.15)
    F = (C * (9/5))+32

    //if else tree
    if (K <= 0){
        confirm("INVALID!! Can't have a negative or zero Kelvin.");
    } else if (F <= 32){
        confirm("Too cold for the human body");
        changeColorBlue();
        //console log
        DisplayTemp[0].innerHTML = `Kelvin     : ${K}`;
        DisplayTemp[1].innerHTML = `Celsius    : ${C}`;
        DisplayTemp[2].innerHTML = `Fehrenheit : ${F}`;
    } else {
        changeColorYellow();
        //console log
        DisplayTemp[0].innerHTML = `Kelvin     : ${K}`;
        DisplayTemp[1].innerHTML = `Celsius    : ${C}`;
        DisplayTemp[2].innerHTML = `Fehrenheit : ${F}`;
    }//end if else tree
}//end function kelvin
function Celsius(){
    //calculation
    img.src = "";
    C = InputNum.value;
    F = (C * (9/5))+32
    K = (C + 273.15)
    
    //if else tree
    if (F <= 32){
        confirm("Too cold for the human body");
        changeColorBlue();
        //console log
        DisplayTemp[0].innerHTML = `Celsius    : ${C}`;
        DisplayTemp[1].innerHTML = `Fehrenheit : ${F}`;
        DisplayTemp[2].innerHTML = `Kelvin     : ${K}`;
    } else if(K <= 0 || C >= 40){
        confirm("Thats too hot for the human body");
        changeColorRed();
        //console log
        DisplayTemp[0].innerHTML = `Celsius : ${C}`;
        DisplayTemp[1].innerHTML = `Fehrenheit : ${F}`;
        DisplayTemp[2].innerHTML = `Kelvin : INVALID!! Can't have a negative or zero Kelvin.`;
    } else {
        changeColorYellow();
        //console log
        DisplayTemp[0].innerHTML = `Celsius    : ${C}`;
        DisplayTemp[1].innerHTML = `Fehrenheit : ${F}`;
        DisplayTemp[2].innerHTML = `Kelvin     : ${K}`;
    }//end if else tree
}//end function celsius
function Fahrenheit(){
    //calculation
    img.src = "";
    F = InputNum.value;
    C = (F - 32)*(5/9);
    K = (C + 273.15)

    //if else tree
    if (F <= 32){
        confirm("Too cold for the human body");
        changeColorBlue();
        //console log
        DisplayTemp[0].innerHTML = `Fehrenheit : ${F}`;
        DisplayTemp[1].innerHTML = `Celsius    : ${C}`;
        DisplayTemp[2].innerHTML = `Kelvin     : ${K}`;
    } else if (K <= 0 || C >= 40){
        //console log
        confirm("Thats too hot for the human body");
        changeColorRed();
        DisplayTemp[0].innerHTML = `Fehrenheit : ${F}`;
        DisplayTemp[1].innerHTML = `Celsius    : ${C}`;
        DisplayTemp[2].innerHTML = `Kelvin     : INVALID!! Can't have a negative or zero Kelvin.`;
    }else {
        changeColorYellow();
        //console log
        DisplayTemp[0].innerHTML = `Fehrenheit : ${F}`;
        DisplayTemp[1].innerHTML = `Celsius    : ${C}`;
        DisplayTemp[2].innerHTML = `Kelvin     : ${K}`;
    }//end if else tree
}//end function fahrenheit

let img = document.getElementById("img");



//color change
function changeColorBlue() {
    img.src = "c:\\Users\\MCA-9\\Desktop\\Pictures\\2354654_b7a48.gif";
    document.getElementById("big").style.backgroundColor = "#0d6efd";
    document.body.appendChild(img);
    
}

function changeColorRed() {
    img.src = "c:\\Users\\MCA-9\\Desktop\\Pictures\\fireGif.gif";
    document.getElementById("big").style.backgroundColor = "red";
    document.body.appendChild(img);
}

function changeColorYellow() {
    document.getElementById("big").style.backgroundColor = "#ffda6a";
}