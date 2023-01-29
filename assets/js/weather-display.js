var latitude, longitude;
// var APIKey = "e80fb51109675d7a9bc4ed534b97b3ae";
var APIKey = "7346f2f976dfac403985b13d4b581099";
var queryURL;

function success(userLocation) {

    latitude = userLocation.coords.latitude;
    longitude = userLocation.coords.longitude;

    console.log(userLocation);
    console.log("Latitude of current location: "+latitude);
    console.log("Longitude of current location: "+longitude);

    queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+APIKey;

    $.ajax({

        url : queryURL,
        method: "GET"

    }).then(function(response) {

        console.log(response);

    });

}

navigator.geolocation.getCurrentPosition(success);

