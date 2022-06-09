var citySearchButton = document.querySelector("#citySearch");
var displayMessage = document.querySelector("#msg");
var apiKey = "4abd1024f9584d5f54942bac2f5cb325";
var currentTemp = document.querySelector("#currentTemp");
var currentWind = document.querySelector("#currentWind");
var currentHumidity = document.querySelector("#currentHum");
var currentUvi = document.querySelector("#currentUvi");


function apiRequest(city){
   fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
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
      currentTemp.textContent=`Temp: ${tempature} F`
      currentWind.textContent=`Wind Speed: ${windSpeed} MPH`
      currentHumidity.textContent=`Humditiy: ${humidity}%`
      currentUvi.textContent=`UV Index: ${uvi}`
  })
})
})
}


citySearchButton.addEventListener("click", function(event) {
    event.preventDefault();
  
    var cityInput = document.querySelector("#clientCity").value;
  
    if (cityInput === "") {
      displayMessage("error", "City cannot be blank");
        return;
    }
    var savedCities = JSON.parse(localStorage.getItem("City")) || [];
      savedCities.push(cityInput)
      localStorage.setItem("City", JSON.stringify(savedCities));
    apiRequest(cityInput)
});
