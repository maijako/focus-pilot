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
