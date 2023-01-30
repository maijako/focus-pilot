// var APIKey = "e80fb51109675d7a9bc4ed534b97b3ae";
var APIKey = "7346f2f976dfac403985b13d4b581099";
var displayEl = $('#date-weather-display');

// Accepts the temperature in Kelvin and returns the temperature in Celsius.
var convertKelvinToCelsius = function(temp) {

    var temInCelsius = temp - 273.15;
    return temInCelsius.toFixed(0);

};

function success(userLocation) {

    var latitude = userLocation.coords.latitude;
    var longitude = userLocation.coords.longitude;

    // console.log(userLocation);
    // console.log("Latitude of current location: "+latitude);
    // console.log("Longitude of current location: "+longitude);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+APIKey;

    $.ajax({

        url : queryURL,
        method: "GET"

    }).then(function(response) {

        console.log(response);
        let currentTemp = convertKelvinToCelsius(response.main.temp);
        let feelsLikeTemp = convertKelvinToCelsius(response.main.feels_like);
        let locName = response.name;
        let icon = response.weather[0].icon;
        let weatherName = response.weather[0].main;
        let weatherDescription = response.weather[0].description;

        console.log("Current Temperature: "+currentTemp);
        console.log("Fls like: "+feelsLikeTemp);
        console.log("loc name: "+locName);
        console.log("icon: "+icon);
        console.log("weatherName: "+weatherName);
        console.log("weatherDescription: "+weatherDescription);

        // An image that contains the corresponding weather icon for the day.
        // var imgIcon = $('<img>');
        // imgIcon.attr('src', "https://openweathermap.org/img/wn/"+icon+"@2x.png");

    });

}

navigator.geolocation.getCurrentPosition(success);

