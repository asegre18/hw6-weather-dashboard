$(document).ready(function () {
    var APIkey = 'd11771b7ba65e99baa089a03cbd1362b';
    var cityChoice = $("#city-name").val();

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
            // console.log(response);
            // console.log(response.name);
            $("#city").html(response.name);
            $("#date").html(moment().format("M/D/YYYY"));
            $("#icon").html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
            $("#temp").html("Temperature: " + response.main.temp + " °F");
            $("#humidity").html("Humidity: " + response.main.humidity + "%");
            $("#wind-speed").html("Wind Speed: " + response.wind.speed + " mph");
        });
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${APIkey}`,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            // console.log(response.list.length);
            // use for loop to add the 5 day forecast without having to type each day 1 by 1
            for (let i = 0; i < response.list.length; i += 8) {
                // console.log(i);
                let date = moment(response.list[i].dt_txt).format("M/D/YYYY");
                let iconN = response.list[i].weather[0].icon;
                let img = "http://openweathermap.org/img/wn/" + iconN + ".png";
                let $imgsrc = $("<img>").attr("src", img);
                let temp = response.list[i].main.temp + " °F";
                let tempFar = (temp - 273.15) * 1.8 + 32;
                let hum = response.list[i].main.humidity + "%";
                let $date = $("<p>").text(date);
                let $temp = $("<p>").text("Temp: " + temp);
                let $hum = $("<p>").text("Humidity: " + hum);
                let $day = $("<div>").attr("class", "card").append($date);
                $day.append($imgsrc);
                $day.append($temp);
                $day.append($hum);
                $(".five-day-forecast").append($day);
            }
        });
    };
    let srcHistory = JSON.parse(localStorage.getItem("#search")) || [];
    const $searchBtn = $("#submit-btn");
    $searchBtn.click(function () {
        const search = $("#city-name").val();
        console.log(search);
        srcHistory.push(search);
        localStorage.setItem("search", JSON.stringify(srcHistory));
        addSearchHistory();
    });

    const $history = $("#history");
    function addSearchHistory() {
       $history.html("");
        for (let i=0; i<srcHistory.length; i++) {
            const historyItem = $("<input>");
            historyItem.attr("type","text");
            historyItem.attr("readonly",true);
            historyItem.attr("class", "form-control d-block bg-white");
            historyItem.attr("value", srcHistory[i]);
            $history.append(historyItem[i]);
        }
    }
    let localNameOfCity = $(".city-name");
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(i);
        localNameOfCity.innerHTML += `${key}: ${value}<br />`;
    }
});