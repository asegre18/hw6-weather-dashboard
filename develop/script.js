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
            console.log(response.list.length);
            // try to use for loop to add the 5 day forecast without having to type each day 1 by 1
            for (let i = 0; i < response.list.length; i+=7) {
                // const element = array[i];
                let date = moment().format("M/D/YYYY");
            let iconN = response.list[i].weather[i].icon;
            let img = "http://openweathermap.org/img/wn/" + iconN + ".png";
            let $imgsrc = $("<img>").attr("src", img);
            let temp = response.list[i].main.temp + " °F";
            let tempFar = (temp - 273.15) * 1.8 + 32;
            let hum = response.list[i].main.humidity + "%";
            let $date= $("<p>").text(date);
            let $img = $("<p>").text(iconN);
            let $temp = $("<p>").text("Temp: " + temp);
            let $hum = $("<p>").text("Humidity: " + hum);
            // $($(".five-day-forecast").attr("card", )
            $(".five-day-forecast").append($date);
            $(".five-day-forecast").append($img);
            $(".five-day-forecast").append($temp);
            $(".five-day-forecast").append($hum);
            }
            // add day1 here
            // let dayOne = moment().format("M/D/YYYY");
            // let dayOneIcon = data.list[0].weather[0].icon;
            // let dayOneImage = "http://openweathermap.org/img/wn/" + dayOneIcon + ".png";
            // let dayOneImageSrc = $("<img>").attr("src", dayOneImage);
            // let dayOneTemp = data.list[0].main.temp + " °F";
            // let dayOneTempFar = (dayOneTemp - 273.15) * 1.8 + 32;
            // let dayOneHum = data.list[0].main.humidity + "%";
            // let $dayOneDate = $("<p>").text(dayOne);
            // let $dayOneImage = $("<p>").text(dayOneIcon);
            // let $dayOneTemp = $("<p>").text("Temp: " + dayOneTemp);
            // let $dayOneHum = $("<p>").text("Humidity: " + dayOneHum);

            // $(".dayOne").append($dayOneDate);
            // $(".dayOne").append($dayOneImage);
            // $(".dayOne").append($dayOneTemp);
            // $(".dayOne").append($dayOneHum);
        });
    };

    let localNameOfCity = $(".city-name");
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(i);
        localStorOutput.innerHTML += `${key}: ${value}<br />`;
    }
});