$(document).ready(function () {
    var APIkey = 'd11771b7ba65e99baa089a03cbd1362b';
    // var cityChoice = prompt('what city do you want to know the weather in?');
    // var countryChoice = prompt('what country is it in?').replace(' ', '');
    var cityChoice = "San Francisco";
    var countryChoice = "USA";
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityChoice},&units=imperial&appid=${APIkey}`,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var city = response.name;
      var wind = response.wind.speed;
      var humidity = response.main.humidity;
      var temp = (parseInt(response.main.temp) - 273.15) * 1.80 + 32;
      $('.city-name').append('<h1>').text(`City: ${city}`).css("font-size", 'xxx-large');
      $('.wind').append('<p>').text(`Wind Speed: ${wind} m/h`);
      $('.humidity').append('<p>').text(`Humidity: ${humidity}%`);
      $('.temp').append('<p>').text(`Temperature: ${temp} F`);
    });

    let nameOfCity = $(".city-name");
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(i);
        localStorOutput.innerHTML += `${key}: ${value}<br />`;
    }
});