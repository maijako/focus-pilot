var APIKey = "_shkc_WoF1uFPCk9-boMYxLfQby8frq2QBtIvl5W5oc";
// queryURL = "https://api.unsplash.com/topics/?client_id="+APIKey;
var queryURL = "https://api.unsplash.com/search/collections/?query=nature&per_page=25&client_id="+APIKey;
// queryURL = "https://api.unsplash.com/collections/?client_id="+APIKey;
//queryURL = "https://api.unsplash.com/collections/1298463/related/?client_id="+APIKey;


var imageGroupEl = $('#timer-todo-section');

$.ajax({

    url : queryURL,
    method: "GET"

}).then(function(response) {

    //console.log(response);
    let resultList = response.results;

    $.each(resultList, function (i, val) { 
         let photoList = val.preview_photos;
         $.each(photoList, function (i, photo) { 
            //  console.log(photo.urls.thumb);

            let imageEl = $('<img>');
            imageEl.attr('src', photo.urls.thumb);
            imageGroupEl.append(imageEl);
         });
    });
    // $.each(response, function (i, val) { 
    //     let imageEl = $('<img>');
    //     imageEl.attr('src', val.urls.thumb);
    //     imageGroupEl.append(imageEl);
         
    // });

});