//let APIKey = "7346f2f976dfac403985b13d4b581099";
let weatherAPIKey = "e80fb51109675d7a9bc4ed534b97b3ae";
var displayEl = $('#date-weather-display');
var today = moment();

$("document").on(function () {
    // $( "#mainWeatherDash" ).draggable();
    // $("#mainWeatherDash").hide()
});

$("document").ready(function () {
    // $( "#mainWeatherDash" ).draggable();
    // $("#mainWeatherDash").fadeOut(500)
});



// Accepts the temperature in Kelvin and returns the temperature in Celsius.
var convertKelvinToCelsius = function(temp) {

    var temInCelsius = temp - 273.15;
    return temInCelsius.toFixed(0);

};

// Adds the common background properties for weather display element.
displayEl.addClass('weather-display');

// Contains the date and time element
// let dateTimeEl = $('<div>').addClass('pt-2 pl-2');
// let dateEl = $('<h5>');
let timeEl = $("#currentDateTime");

// Gets the current date and time and adds it to the appropriate elements.
// dateEl.text(today.format('dddd, MMMM Do'));
// timeEl.text(today.format('h:mm a'));

// Appends all the child elements to the parent display element.
// dateTimeEl.append(dateEl);
// dateTimeEl.append(timeEl);
// displayEl.append(dateTimeEl);

//Target HTML Elements

let mainWeatherDash = $("#mainWeatherDash");
let temperature = $("#temperature");
let locationName = $("#locationName");
let mainDescription = $("#mainDescription");
let secondaryDescription = $("#secondaryDescription");
let feelLikeValue = $("#feelLikeValue");
let windValue = $("#windValue");
let humidityValue = $("#humidityValue");
let mainWeatherImage = $("#mainWeatherImage");

// This interval is set for updating the current time every 1 minute.
setInterval(() => {
    timeEl.text('');
    today = moment();
    timeEl.text(today.format('MMMM Do YYYY, h:mm:ss a'));
}, 1000);

// A call back function which is returned by the geolocation Web API, to get the coordinates of the location of the user. 
function success(userLocation) {

    // Stores the latitude and longitude values of the current location.
    var latitude = userLocation.coords.latitude;
    var longitude = userLocation.coords.longitude;

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+weatherAPIKey;

    // API call is made to get the weather details of the current location
    $.ajax({

        url : queryURL,
        method: "GET"

    }).then(function(response) {



        // Creates different nodes to be added to the weather display section.
        // let weatherEl = $('<div>');
        // let tempEl = $('<div>');
        // let descriptionEl = $('<div>');
        // let imgIcon = $('<img>');

        console.log(response)

        // Stores all the required values from the weather API response.
        temperature.text(convertKelvinToCelsius(response.main.temp));
        feelLikeValue.text(convertKelvinToCelsius(response.main.feels_like) + "°C");
        locationName.text(response.name);
        windValue.text(response.wind.speed +" km/h");
        humidityValue.text(response.main.humidity + "%");
        mainDescription.text(response.weather[0].main)
        secondaryDescription.text("("+response.weather[0].description+")")
        let icon = response.weather[0].icon;
        let weatherName = response.weather[0].main;
        //let weatherDescription = response.weather[0].description;

        // // Creates the DOM structure for displaying all the weather details dynamically.
        // tempEl.addClass('p-2 d-flex flex-column justify-content-center');

        // tempEl.append($('<h5>').text(locName));
        // tempEl.append($('<h5>').text(currentTemp+"\u00B0C"));
        // tempEl.append($('<p>').text("Feels like: "+feelsLikeTemp+"\u00B0C"));
        // weatherEl.append(tempEl);

        // // An image that contains the corresponding weather icon for the day.
        // mainWeatherImage.attr('src', "https://openweathermap.org/img/wn/"+icon+"@2x.png");

        setWeatherIcon(icon, mainWeatherImage)
        // descriptionEl.append(imgIcon);

        // weatherEl.append(descriptionEl);
        // weatherEl.addClass("d-flex flex-row");
        // displayEl.append(weatherEl);

        // Appropriate background images are set according to the specific weather conditions.
        if(icon[2] === 'n'){

            mainWeatherDash.addClass('night-sky');

        } else if(weatherName === "Thunderstorm") {

            mainWeatherDash.addClass('thunderstorm');

        } else if(weatherName === "Rain") {

            mainWeatherDash.addClass('rainy');
            // mainWeatherDash.removeClass("text-white")

        } else if(weatherName === "Snow") {

            mainWeatherDash.addClass('snow');

        }else {

            mainWeatherDash.addClass('clear-sky');
            mainWeatherDash.removeClass("text-white")
        }

        
        $("#weatherContainer").removeClass("d-none")
        $("#weatherContainer").fadeIn(500)


    });

    
}

//Sets weather icon based on retreived data
function setWeatherIcon(iconCode, iconImgEl) {
    iconImgEl.attr("src", "./././assets/images/" + iconCode + ".png")
}


// A call made to get the current position of the user.
navigator.geolocation.getCurrentPosition(success);

