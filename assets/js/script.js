var today = moment();
var preventAutoBreak = false; //break will autostart by default
var preventAutoWork = false; //work will autostart by default
const GNewsAPIKey = "b57b45fb4408a8874beaaa42ce3ad131"
let isRightPanelVisible = false;

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
})

let pomodoroTimerWorkTime = $("#pomodoroTimer")
let pomodoroTimerShortBreak = $("#shortBreak")
let pomodoroTimerLongBreak = $("#longBreak")

pomodoroTimerWorkTime.on("focusin", function(){
  showTimerInfo()
})

pomodoroTimerShortBreak.on("focusin", function(){
  showTimerInfo()
})


pomodoroTimerLongBreak.on("focusin", function(){
  showTimerInfo()
})


function showTimerInfo(){
  $("#timerInfo").removeClass("d-none");
}

function hideTimerInfo(){
  $("#timerInfo").addClass("d-none");
}

pomodoroTimerWorkTime.on("focusout", function (){
  
  //check if value meets minimum, if not set to minimum and maximum allowed.
  //Set to 1 for demonstration purposes
  if (pomodoroTimerWorkTime.val() < 1) {
    pomodoroTimerWorkTime.val(1) ;
  }
  else if(pomodoroTimerWorkTime.val() > 60){
    pomodoroTimerWorkTime.val(60)
  }
  hideTimerInfo()
})

pomodoroTimerShortBreak.on("focusout", function (){
  //check if value meets minimum, if not set to minimum and maximum allowed.
  //Set to 1 for demonstration purposes
  if (pomodoroTimerShortBreak.val() < 1) {
    pomodoroTimerShortBreak.val(1) ;
  }
  else if(pomodoroTimerShortBreak.val() > 30){
    pomodoroTimerShortBreak.val(30)
  }
  hideTimerInfo()
})


pomodoroTimerLongBreak.on("focusout", function (){
  
  //check if value meets minimum, if not set to minimum and maximum allowed.
  //Set to 1 for demonstration purposes
  if (pomodoroTimerLongBreak.val() < 1) {
    pomodoroTimerLongBreak.val(1) ;
  }
  else if(pomodoroTimerLongBreak.val() > 60){
    pomodoroTimerLongBreak.val(60)
  }
  hideTimerInfo()
})



$("document").ready(function () {
  Toast.fire({
    icon: 'info',
    title: 'Click on the background to hide or show settings.'
  })

});



$("#countdownTimer").on("click", function () {

  $("#countdownTimer").toggleClass("countdownTimerPaused")

  if (intervalPaused) {
    intervalPaused = false;
  } else {
    intervalPaused = true;
  }
});

//prevent autostart breaks if Break form field is toggled on
$("#autostartBreakInput").click(function(){
  preventAutoBreak = !preventAutoBreak;
});

//prevent autostart work blocks after breaks, if Work form field is toggled on
$("#autoStartPomodoroInput").click(function(){
  preventAutoWork = !preventAutoWork;
});

$("#main-background").on("click", function () {
  if (isRightPanelVisible) {
    
  }
  else {
    $("#leftPanelButton").trigger("click");
  }
  
})



//Event handler for when left panel canvas is hidden
$("#offcanvasScrolling").on("hidden.bs.offcanvas", function () {
  showElements()

  $("#leftPanelButton").show();
  $("#fullScreenButton").show();
})

//Event handler for when left panel canvas is shown
$("#offcanvasScrolling").on("shown.bs.offcanvas", function () {
  fadeElements()

})

//Event handler for when right panel canvas is hidden
$("#offcanvasRight").on("hidden.bs.offcanvas", function () {
  isRightPanelVisible = false;
  $("#rightPanelButton").show();
})

//Event handler for when right panel canvas is shown
$("#offcanvasRight").on("shown.bs.offcanvas", function () {
  isRightPanelVisible = true;
  $("#latest-news").empty();
  getNewsAPI("breaking-news")
  $("#news-header").text("Here's the latest Breaking News")
})


$("#startPomodoroTimer").on("click", function () {
  if ($(this).text() === "Stop") {
    intervalPaused = true;
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

        clearInterval(pomodoroInterval);
        clearInterval(shortBreakInterval);
        clearInterval(longBreakInterval);
        countIntervals = 0;

        //Show weather information.
        $("#weatherContainer").show("slow", "swing");

        //Hide Timer container
        $("#countdownTimerContainer").addClass("d-none")
        $(this).text("Start")
        $(this).addClass("btn-dark");

      } else if (result.isDenied) {
        intervalPaused = false;
      }
    })
  }
  else if ($(this).text() === "Start") {

    $("#leftPanelCloseButton").trigger("click");

    //Hide weather information.
    $("#weatherContainer").hide(1000, "swing", function () {
      //Show Timer container
      // $("#countdownTimer").fadeTo("slow", 1, function () {
      //   initializeTimer();
      //   //intervalPaused = false;
      //   startPomodoroInterval();
      // });

      $("#countdownTimerContainer").removeClass("d-none");
      initializeTimer();
      //intervalPaused = false;
      startPomodoroInterval();

    });

    $(this).text("Stop")
    $(this).removeClass("btn-dark");
    $(this).addClass("btn-danger");
  }
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

// $("#tabs").tabs();


//Resize window event listener
$(window).resize(function () {
  if ($("#offcanvasScrolling").hasClass("show")) {
    fadeElements()
  }
  else {
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
  $("#weatherContainer").fadeTo("slow", 1.0)

  $(".navbar-brand").fadeTo("slow", 1.0)

  $("iframe").fadeTo("slow", 1.0)
}

//Fade Elements
function fadeElements() {
  $("#weatherContainer").fadeTo("slow", 0.4)

  $(".navbar-brand").fadeTo("slow", 0.4)

  $("iframe").fadeTo("slow", 0.4)
}

$("#news-categories").children().on("click", function () {

  $("#latest-news").empty();
  getNewsAPI($(this).attr("data-news-category"))
  $("#news-header").text("Here's the latest in " + $(this).text() + ".")
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
    target: "_blank",
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