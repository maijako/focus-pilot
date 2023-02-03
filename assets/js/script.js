var today = moment();

const GNewsAPIKey = "b57b45fb4408a8874beaaa42ce3ad131"

$("document").on(function () {

});

$("#countdownTimer").on("click", function () {
  $("#countdownTimer").toggleClass("countdownTimerPaused")

})

//Event handler for when left panel canvas is hidden
$("#offcanvasScrolling").on("hidden.bs.offcanvas", function(){
  showElements()
})

//Event handler for when left panel canvas is shown
$("#offcanvasScrolling").on("shown.bs.offcanvas", function(){
  fadeElements()
})

//Event handler for when right panel canvas is hidden
$("#offcanvasRight").on("hidden.bs.offcanvas", function(){
  $("#leftPanelButton").show();
  $("#fullScreenButton").show();
})

//Event handler for when right panel canvas is shown
$("#offcanvasRight").on("shown.bs.offcanvas", function(){
  $("#latest-news").empty();
  getNewsAPI("breaking-news") 
  $("#news-header").text("Here's the latest Breaking News")
})


$("#startPomodoroTimer").on("click", function () {
  if ($(this).text() === "Stop") {

    Swal.fire({
      icon: 'warning',
      title: 'Cancel the timer?',
      text: 'This will reset your entire session.',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {

        //PLACE CANCEL TIMER FUNCTION HERE!


        //Show weather information.
        $("#weatherContainer").show("slow", "swing");

        //Hide Timer container
        $("#countdownTimerContainer").fadeTo("slow", 0, function () {

        });
        $(this).text("Start")
        $(this).addClass("btn-dark");

      } else if (result.isDenied) {
      }
    })
  }
  else if ($(this).text() === "Start") {

    $("#leftPanelCloseButton").trigger("click");

    //Hide weather information.
    $("#weatherContainer").hide(1000, "swing", function () {
      //Show Timer container
      $("#countdownTimerContainer").fadeTo("slow", 1, function () {

      });
    });



    $(this).text("Stop")
    $(this).removeClass("btn-dark");
    $(this).addClass("btn-danger");
  }
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
  if ($("#offcanvasScrolling").hasClass("show")) {
    fadeElements()
  }
  else{
    showElements()
  }
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

$("#fullScreenButton").click(function () {
  openFullscreen()
})



//Show Elements.
function showElements() {
    $("#weatherContainer").fadeTo("slow",1.0)

    $(".navbar-brand").fadeTo("slow",1.0)

    $("iframe").fadeTo("slow",1.0)
}

//Fade Elements
function fadeElements() {
    $("#weatherContainer").fadeTo("slow",0.4)

    $(".navbar-brand").fadeTo("slow",0.4)

    $("iframe").fadeTo("slow",0.4)
}

$("#news-categories").children().on("click", function () {
  
  $("#latest-news").empty();
  getNewsAPI($(this).attr("data-news-category")) 
  $("#news-header").text("Here's the latest in "+ $(this).text() + ".")
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

        createNewsCards(articles[i]['image'], articles[i]['title'], articles[i]['title'], articles[i]['description'], articles[i]['url'], moment(articles[i]['publishedAt']).format("ddd, LL, LT"))
      }
    });
}

function createNewsCards(newsImageURL, newsImageALT, newsTitle, newsDescription, newsURL, newsTime) {
  let cardAnchor = $("<a>", {
    class: "news-link col",
    target:"_blank",
    href: newsURL
  })

  let mainCard = $("<div>", {
    class: "card p-0 news-card"
  })

  let cardImg = $("<img>", {
    class: "card-img-top",
  })

  let cardBody = $("<div>", {
    class: "card-body news-card-body"
  })

  let cardTitle = $("<h5>", {
    class: "card-title news-title"
  })

  let cardText = $("<p>", {
    class: "card-text news-card-text"
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
  cardFooterText.text(newsTime);

  cardImg.appendTo(mainCard)

  cardTitle.appendTo(cardBody)
  cardText.appendTo(cardBody)

  cardBody.appendTo(mainCard)

  cardFooterText.appendTo(cardFooter)

  cardFooter.appendTo(mainCard)

  mainCard.appendTo(cardAnchor)

  cardAnchor.appendTo($("#latest-news"))

}