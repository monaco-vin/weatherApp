var citySearchButton = document.querySelector("#citySearch");
var displayMessage = document.querySelector("#msg");
var apiKey = "4abd1024f9584d5f54942bac2f5cb325";
var currentTemp = document.querySelector("#currentTemp");
var currentWind = document.querySelector("#currentWind");
var currentHumidity = document.querySelector("#currentHum");
var currentUvi = document.querySelector("#currentUvi");
var futureForecast = document.querySelector('#futureForecast');
var searchBtns = document.querySelector("#searchBtns");


function apiRequest(city){
   fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
   .then(data => {
     return data.json()
   })
   .then(results => {
    let { lat, lon } = results[0];
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`)

    .then(dataResults =>{
    return dataResults.json()

    .then(cityData =>{
      var tempature = cityData['current']['temp']
      var windSpeed = cityData['current']['wind_speed']
      var humidity = cityData['current']['humidity']
      var uvi = cityData['current']['uvi']
      var currentMain = cityData['current']['weather'][0]['main']
      var currentDesc = cityData['current']['weather'][0]['description']

      currentTemp.textContent=`Temp: ${tempature} F`
      currentWind.textContent=`Wind Speed: ${windSpeed} MPH`
      currentHumidity.textContent=`Humditiy: ${humidity}%`
      currentUvi.textContent=`UV Index: ${uvi}`
      currentUvi.style.backgroundColor = uvi < 3 ? "blue" : uvi < 6 ? "orange" : "red";
      displayFiveDay(cityData['daily'])
  })
})
})
};
function displayFiveDay(daily){
  let forecast = "";
  daily.forEach((day, i) => {
    if(i >  0 && i < 6) {
    console.log(day)
    const date = new Date(day.dt * 1000).toLocaleDateString();
    const nextDay = `<div class="col-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${date}</h5>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
        <p class="card-text">Temp: ${day.temp.day}° F</p>
        <p class="card-text">Wind: ${day.wind_speed} MPH</p>
        <p class="card-text">Humidity: ${day.humidity}%</p>
      </div>
    </div>
  </div>`
  forecast += nextDay
}
  });
  futureForecast.innerHTML = forecast;
}

citySearchButton.addEventListener("click", function(event) {
    event.preventDefault();
    var cityInput = document.querySelector("#clientCity").value;
    var currentCity = document.querySelector('#currentCity')
  
    if (cityInput === "") {
      alert("ERROR City cannot be blank");
        return;
    }
    const str = cityInput;
    const str2 = str.toUpperCase();
    currentCity.textContent = str2;

    var savedCities = JSON.parse(localStorage.getItem("City")) || [];

    if(!savedCities.includes(cityInput)){
      savedCities.push(cityInput)
      localStorage.setItem("City", JSON.stringify(savedCities));
    }
    apiRequest(cityInput)
    renderButtons()
});

function renderButtons(){
  var savedCities = JSON.parse(localStorage.getItem("City")) || [];
  var buttons = "";
  savedCities.forEach(city =>{
    const button = `<button type="button" onclick="apiRequest('${city}')" class="btn btn-primary">${city}</button>`
    buttons += button
  })
searchBtns.innerHTML = buttons;

}
renderButtons()