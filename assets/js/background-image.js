let imageAPIKey = "_shkc_WoF1uFPCk9-boMYxLfQby8frq2QBtIvl5W5oc";

let queryURL = "https://api.unsplash.com/search/collections/?query=nature&per_page=24&client_id="+imageAPIKey;

var mainContainerEl = $('#main-container');
var imageList = [];

$.ajax({

    url : queryURL,
    method: "GET"

}).then(function(response) {

    //console.log(response);
    let resultList = response.results;

    $.each(resultList, function (i, val) { 
        let excludeIDList = ["10048862", "9744402"];
        
        let imageObject = {
            imageID : val.id,
            image : val.cover_photo.urls.regular,
            createdAt : val.cover_photo.created_at,
            updatedAt : val.cover_photo.updated_at,
            userName : val.cover_photo.user.name,
            userLocation : val.cover_photo.user.location
        };

        if(!excludeIDList.includes(imageObject.imageID)){
            imageList.push(imageObject);
        }
    });

});

var i=0;

setInterval(() => {

    let imgObj = imageList[i];
    mainContainerEl.css('background-image', 'url('+imgObj.image+')');
    console.log("Index value: "+i+" ----------------------");
    console.log("ID: "+imgObj.imageID);
    console.log("User Name: "+imgObj.userName);
    console.log("Created: "+imgObj.createdAt);

    i++;
    console.log("Image List Length: "+imageList.length);
    if(imageList.length === i){
        i=0;
    }

}, 5000);