$(document).ready(function () {
    var APIkey = 'd11771b7ba65e99baa089a03cbd1362b';
    var cityChoice = $("#city-name").val();
    // $.ajax({
    //     url: `https://api.openweathermap.org/data/2.5/weather?q=${cityChoice},&units=imperial&appid=${APIkey}`,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    //     var city = response.name;
    //     var wind = response.wind.speed;
    //     var humidity = response.main.humidity;
    //     var temp = (parseInt(response.main.temp) - 273.15) * 1.80 + 32;
    //     $('.city-name').append('<h1>').text(`City: ${city}`).css("font-size", 'xxx-large');
    //     $('.wind').append('<p>').text(`Wind Speed: ${wind} m/h`);
    //     $('.humidity').append('<p>').text(`Humidity: ${humidity}%`);
    //     $('.temp').append('<p>').text(`Temperature: ${temp} F`);
    // });

    $("#city-input").submit(function (event) {
        event.preventDefault();
        let nameOfCity = $("#city-name").val();
        getWeather(nameOfCity);
    });

    function getWeather(cityName) {
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIkey}`,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // console.log(response.name);
            $("#city").html(response.name);
            $("#icon").html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
            $("#temp").html("Temperature: " + response.main.temp + " °F");
            $("#humidity").html("Humidity: " + response.main.humidity + "%");
            $("#wind-speed").html("Wind Speed: " + response.wind.speed + " mph");
        });
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${APIkey}`,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (let i = 0; i < 5; i++) {
                // const element = array[i];
                let dayOne = moment().format("M/D/YYYY");
            let dayOneIcon = data.list[i].weather[i].icon;
            let dayOneImage = "http://openweathermap.org/img/wn/" + dayOneIcon + ".png";
            let dayOneImageSrc = $("<img>").attr("src", dayOneImage);
            let dayOneTemp = data.list[i].main.temp + " °F";
            let dayOneTempFar = (dayOneTemp - 273.15) * 1.8 + 32;
            let dayOneHum = data.list[i].main.humidity + "%";
            }
            
        });
    };

    let localNameOfCity = $(".city-name");
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(i);
        localStorOutput.innerHTML += `${key}: ${value}<br />`;
    }
});