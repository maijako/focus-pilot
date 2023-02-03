const GNewsAPIKey = "b57b45fb4408a8874beaaa42ce3ad131"

$("document").on(function () {

});

$("document").ready(function () {
  $("#leftPanelButton").trigger("click");
});

$("#leftPanelButton").on("click", function (evt) {
  $("#leftPanelButton").hide();
  $("#fullScreenButton").hide();
})


$("#leftPanelCloseButton").on("click", function (evt) {
  $("#leftPanelButton").show();
  $("#fullScreenButton").show();
})

$("#timerForm").submit(function (event) {
  event.preventDefault();
})

$("#tabs").tabs();


//Resize window event listener
$(window).resize(function () {
  hideShowElements()
})

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (elem.exitFullscreen) {
    elem.exitFullscreen();
  } else if (elem.webkitExitFullscreen) { /* Safari */
    elem.webkitExitFullscreen();
  } else if (elem.msExitFullscreen) { /* IE11 */
    elem.msExitFullscreen();
  }
}


$("#fullScreenButton").click(function () {
  openFullscreen()
})


//Apply and Remove container type classes to element sections.
function hideShowElements() {
  if ($(window).width() < 1145) {
    $("#weatherContainer").fadeOut(500)

  }
  else {
    $("#weatherContainer").fadeIn(500)
  }

  if ($(window).width() < 900) {
    $(".navbar-brand").fadeOut(500)

  }
  else {
    $(".navbar-brand").fadeIn(500)
  }

  if ($(window).width() < 700) {
    $("iframe").fadeOut(500)
  }
  else {
    $("iframe").fadeIn(500)
  }
}

$("#news-categories").children().on("click", function () {
  console.log($(this).attr("data-news-category"))

  getNewsAPI($(this).attr("data-news-category")) 
})


// GET NEWS API
function getNewsAPI(topic) {
  url = 'https://gnews.io/api/v4/top-headlines?token=' + GNewsAPIKey + '&topic=' + topic + '&lang=en&max=10';

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      articles = data.articles;

      for (i = 0; i < articles.length; i++) {
        // articles[i].title
        // console.log("Title: " + articles[i]['title']);
        // articles[i].description
        // console.log("Description: " + articles[i]['description']);
        // You can replace {property} below with any of the article properties returned by the API.
        // articles[i].{property}
        // console.log(articles[i]['{property}']);

        // Delete this line to display all the articles returned by the request. Currently only the first article is displayed.
        // break;

        createNewsCards(articles[i]['url'], articles[i]['title'], articles[i]['title'], articles[i]['description'], "newsCategory", "newsTime")
      }
    });
}

// createNewsCards("https://resize.indiatvnews.com/en/resize/newbucket/715_-/2020/09/breakingnews-live-blog-1568185450-1595123397-1601430958.jpg", "Alt Text", "News Title", "News Description", "category", "6:45pm")

function createNewsCards(newsImageURL, newsImageALT, newsTitle, newsDescription, newsCategory, newsTime) {
  let cardAnchor = $("<a>", {
    class: "news-link col",
    href: "#"
  })

  let mainCard = $("<div>", {
    class: "card p-0"
  })

  let cardImg = $("<img>", {
    class: "card-img-top",
  })

  let cardBody = $("<div>", {
    class: "card-body news-card-body"
  })

  let cardTitle = $("<h5>", {
    class: "card-title"
  })

  let cardText = $("<p>", {
    class: "card-text news-card-text"
  })

  let cardCategoryBadge = $("<p>", {
    class: "news-category badge rounded-pill bg-secondary py-1 my-1"
  })

  let cardFooter = $("<div>", {
    class: "card-footer"
  })

  let cardFooterText = $("<p>", {
    class: "card-text text-muted"
  })

  cardImg.attr("src", newsImageURL)
  cardImg.attr("alt", newsImageALT)
  cardTitle.text(newsTitle);
  cardText.text(newsDescription);
  cardCategoryBadge.text(newsCategory);
  cardFooterText.text(newsTime);

  cardImg.appendTo(mainCard)

  cardTitle.appendTo(cardBody)
  cardText.appendTo(cardBody)
  cardCategoryBadge.appendTo(cardBody)

  cardBody.appendTo(mainCard)

  cardFooterText.appendTo(cardFooter)

  cardFooter.appendTo(mainCard)

  mainCard.appendTo(cardAnchor)


  cardAnchor.appendTo($("#latest-news"))

}