var APIKey = "e80fb51109675d7a9bc4ed534b97b3ae";
//var APIKey = "7346f2f976dfac403985b13d4b581099";
var displayEl = $('#date-weather-display');
var today = moment();

// Accepts the temperature in Kelvin and returns the temperature in Celsius.
var convertKelvinToCelsius = function(temp) {

    var temInCelsius = temp - 273.15;
    return temInCelsius.toFixed(0);

};

let dateEl = $('<h5>').addClass('p-2');
let timeEl = $('<h5>').addClass('p-2');
dateEl.text(today.format('dddd, MMMM Do'));
timeEl.text(today.format('h:mm a'));
displayEl.append(dateEl);
displayEl.append(timeEl);

setInterval(() => {
    timeEl.text('');
    today = moment();
    timeEl.text(today.format('h:mm a'));
}, 60000);

function success(userLocation) {

    var latitude = userLocation.coords.latitude;
    var longitude = userLocation.coords.longitude;

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+APIKey;

    $.ajax({

        url : queryURL,
        method: "GET"

    }).then(function(response) {

        let weatherEl = $('<div>');
        let tempEl = $('<div>');
        let descriptionEl = $('<div>');
        let imgIcon = $('<img>');

        console.log(response);
        let currentTemp = convertKelvinToCelsius(response.main.temp);
        let feelsLikeTemp = convertKelvinToCelsius(response.main.feels_like);
        let locName = response.name;
        let icon = response.weather[0].icon;
        let weatherName = response.weather[0].main;
        let weatherDescription = response.weather[0].description;

        tempEl.addClass('p-2 d-flex flex-column justify-content-center');

        tempEl.append($('<h5>').text(currentTemp+"\u00B0C"));
        tempEl.append($('<p>').text("Feels like: "+feelsLikeTemp+"\u00B0C"));
        weatherEl.append(tempEl);

        // An image that contains the corresponding weather icon for the day.
        imgIcon.attr('src', "https://openweathermap.org/img/wn/"+icon+"@2x.png");
        descriptionEl.append(imgIcon);
        weatherEl.append(descriptionEl);

        console.log("Current Temperature: "+currentTemp);
        console.log("Fls like: "+feelsLikeTemp);
        console.log("loc name: "+locName);
        console.log("icon: "+icon);
        console.log("weatherName: "+weatherName);
        console.log("weatherDescription: "+weatherDescription);

        weatherEl.addClass("d-flex flex-row");
        displayEl.append(weatherEl);

        

    });

}

navigator.geolocation.getCurrentPosition(success);

