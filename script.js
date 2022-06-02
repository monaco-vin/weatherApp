var citySearchButton = document.querySelector("#citySearch");
var displayMessage = document.querySelector("#msg");



citySearchButton.addEventListener("click", function(event) {
    event.preventDefault();
  
    var cityInput = document.querySelector("#clientCity").value;
  
    if (cityInput === "") {
      displayMessage("error", "City cannot be blank");
  
      localStorage.setItem("City", cityInput);
      console.log(cityInput)
      //renderLastRegistered();
    }
  });