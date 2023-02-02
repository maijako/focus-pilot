$("document").on(function () {

});

$("document").ready(function () {
  $("#leftPanelButton").trigger("click");
});

$("#leftPanelButton").on("click", function(evt){
  $("#leftPanelButton").hide();
  $("#fullScreenButton").hide();
})


$("#leftPanelCloseButton").on("click", function(evt){
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
