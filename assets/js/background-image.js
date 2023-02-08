let imageAPIKey = "_shkc_WoF1uFPCk9-boMYxLfQby8frq2QBtIvl5W5oc";

let queryURL = "https://api.unsplash.com/search/collections/?query=nature&per_page=24&client_id=" + imageAPIKey;

var mainBackgroundEl = $('#main-background');
var imageList = [];
var currentImageIndex = 0
let halfHourInterval = 60000 * 30;
// let halfHourInterval = 5000;

let imageByUsername = $("#imageByUsername")


$.ajax({

    url: queryURL,
    method: "GET"

}).then(function (response) {

    let resultList = response.results;

    $.each(resultList, function (i, val) {
        let excludeIDList = ["10048862", "9744402"];

        let imageObject = {
            imageID: val.id,
            image: val.cover_photo.urls.regular,
            createdAt: val.cover_photo.created_at,
            updatedAt: val.cover_photo.updated_at,
            userName: val.cover_photo.user.name,
            userLocation: val.cover_photo.user.location
        };

        if (!excludeIDList.includes(imageObject.imageID)) {
            imageList.push(imageObject);
        }
    });

});



var i = 0;

setInterval(() => {

    changeBackgroundImage(i)

    i++;
    // console.log("Image List Length: " + imageList.length);
    if (imageList.length === i) {
        i = 0;
    }

}, halfHourInterval);


function changeBackgroundImage(imageIndex) {
    let imgObj = imageList[imageIndex];
    currentImageIndex = imageIndex;
    //Fade out animation added to smoothen the changing process.
    $("#copyright-footer").fadeOut("slow")
    mainBackgroundEl.fadeOut("slow", function () {
        mainBackgroundEl.css({ "background-image": 'url(' + imgObj.image + ')' });

        //Fade in to bring back the background Image
        mainBackgroundEl.fadeIn("slow", function () {

            imageByUsername.text(imgObj.userName)
            $("#copyright-footer").fadeIn("slow");
        });

    });


}

function getPreviousImage() {
    if (imageList.length > 1) {
        if (currentImageIndex === 0) {
            changeBackgroundImage(imageList.length-1)
            currentImageIndex = imageList.length-1
        }
        else {
            changeBackgroundImage(currentImageIndex - 1)
        }
    }
    
}

function getNextImage() {
    if (imageList.length > 1) {
        if (typeof imageList[currentImageIndex + 1] === 'undefined') {
            // does not exist
            changeBackgroundImage(0)
            currentImageIndex = 0
        }
        else {
            //exist
            changeBackgroundImage(currentImageIndex + 1)
        }

    }
}

$("#background-control-next").on("click", function () {
    getNextImage()
})

$("#background-control-previous").on("click", function () {
    getPreviousImage()
})
