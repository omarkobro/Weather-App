//Search
let searchInput = document.getElementById("locationInput");
let searchButton = document.getElementById("locationButton");

// Current Day
let currentDay = document.getElementById("currentDay");
let currentDate = document.getElementById("currentDate");
let currentDateNumber = document.getElementById("currentDateNumber")
let city = document.getElementById("cityName");
let currentTemp = document.getElementById("currentTemp");
let currentImg= document.getElementById("currentImg");
let currentDayInfo = document.getElementById("currentDayInfo");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");

// Tomorrow 
let nextDay= document.getElementById("nextDay");
let nextDayImg= document.getElementById("nextDayImg");
let nextDayMaxTemp= document.getElementById("nextDayMaxTemp");
let nextDayMinTemp= document.getElementById("nextDayMinTemp");
let nextDayInfo= document.getElementById("nextDayInfo");

// after Tomorrow
let AfterTomorrow = document.getElementById("AfterTomorrow");
let AfterTomorrowImg = document.getElementById("AfterTomorrowImg");
let AfterTomorrowMaxTemp = document.getElementById("AfterTomorrowMaxTemp");
let AfterTomorrowMinTemp = document.getElementById("AfterTomorrowMinTemp");
let AfterTomorrowInfo = document.getElementById("AfterTomorrowInfo");
let weatherApiInfo;

//API Function
async function getWeather(){
    weatherApiInfo = await fetch("http://api.weatherapi.com/v1/forecast.json?key=ecd910d82c834f0e8ed131531231408&q=Cairo&days=3&aqi=no&alerts=no")
    let weatherData = await weatherApiInfo.json()
    return weatherData
}

// Today Data

function DisplayTodayData(today){
    let todayDate = new Date()
    // let x = todayDate.getDate()
    // console.log(x);
    currentDay.innerHTML = todayDate.toLocaleDateString("en-US", {weekday:"long"})
    // currentDate.innerHTML = todayDate.toLocaleDateString("en-US", {month:"long"})
    currentDate.innerHTML = todayDate.getDate()+` ${currentDate.innerHTML = todayDate.toLocaleDateString("en-US", {month:"long"})
}`
    city.innerHTML = today.location.name
    let dgree = parseInt(today.current.temp_c)
    console.log(dgree);
    currentTemp.innerHTML = dgree +"°C"
    currentImg.setAttribute("src",today.current.condition.icon)
    currentDayInfo.innerHTML = today.current.condition.text
    humidity.innerHTML = `<img src="Img/icon-umberella@2x.png" alt="">
    ${today.current.humidity}%`
    windSpeed.innerHTML = `<img src="Img/icon-wind@2x.png" alt="">
    ${today.current.wind_kph}%`
    windDirection.innerHTML = `<img src="Img/icon-compass@2x.png" alt="">
    ${today.current.wind_dir}`
}

//Tomorrrw
function DisplayTomorrowData(tomorrow){
    let x = tomorrow.forecast.forecastday[1].date
    console.log(x);
    let todayDate = new Date(x)
    nextDay.innerHTML = todayDate.toLocaleDateString("en-US", {weekday:"long"})
    nextDayMaxTemp.innerHTML = tomorrow.forecast.forecastday[1].day.maxtemp_c+"°C"
    nextDayMinTemp.innerHTML = tomorrow.forecast.forecastday[1].day.mintemp_c+"°C"
    nextDayInfo.innerHTML = tomorrow.forecast.forecastday[1].day.condition.text
    nextDayImg.setAttribute("src",tomorrow.forecast.forecastday[1].day.condition.icon)
}

//After Tomorrrw
function DisplayAfterTomorrowData(aftertomorrow){
    let x = aftertomorrow.forecast.forecastday[2].date
    let todayDate = new Date(x)
    AfterTomorrow.innerHTML = todayDate.toLocaleDateString("en-US", {weekday:"long"})
    AfterTomorrowMaxTemp.innerHTML = aftertomorrow.forecast.forecastday[2].day.maxtemp_c+"°C"
    AfterTomorrowMinTemp.innerHTML = aftertomorrow.forecast.forecastday[2].day.mintemp_c+"°C"
    AfterTomorrowInfo.innerHTML = aftertomorrow.forecast.forecastday[2].day.condition.text
    AfterTomorrowImg.setAttribute("src",aftertomorrow.forecast.forecastday[2].day.condition.icon)
}

//Search
function Search(){
    searchButton.addEventListener("click", async function(){
        console.log("hello");
        let searchValue = searchInput.value
        weatherApiInfo = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ecd910d82c834f0e8ed131531231408&q=${searchValue}&days=3&aqi=no&alerts=no`)
        let weatherData = await weatherApiInfo.json()
        DisplayTodayData(weatherData)
        DisplayTomorrowData(weatherData)
        DisplayAfterTomorrowData(weatherData)
        // return weatherData
    })
}

//Starting All Functions 
async function start(){
    let weather = await getWeather()
    DisplayTodayData(weather)
    DisplayTomorrowData(weather)
    DisplayAfterTomorrowData(weather)
    Search()
}
start()
