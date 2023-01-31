

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


// $("#exitFullScreenButton").click(function () {
//     closeFullscreen()
// })

