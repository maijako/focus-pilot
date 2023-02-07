//set variables
var countIntervals = 0;
var workDuration, shortBreakDuration, longBreakDuration, interval;
var pomodoroInterval, longBreakInterval, shortBreakInterval;
var intervalPaused;

var timeDisplay = $("#countdownTimer");
var timeContainer = $('#countdownTimerContainer')
var nextText = $("#whatsNext");
var additionalTimeEl = $('#additionalTimerInfo');

var workMinutes, shortBreak, longBreak;
var endTimeAudio = new Audio("assets/audio/end_of_time_sound.wav");

var initializeTimer = function () {
  //grabbing user values from input fields, or using default if input is null
  workMinutes = $("#pomodoroTimer").val() || 25;
  shortBreak = $("#shortBreak").val() || 5;
  longBreak = $("#longBreak").val() || 15;
  //using moment.duration to set work and break blocks
  workDuration = moment.duration(workMinutes, 'minutes');
  shortBreakDuration = moment.duration(shortBreak, 'minutes');
  longBreakDuration = moment.duration(longBreak, 'minutes');
  interval = 1000;
  intervalPaused = false;
}




//storing time display format in a function that will be called in work and break blocks
function displayTime(duration, text) {
  var minutes = duration.minutes();
  var seconds = duration.seconds();
  if (seconds < 0) {
    seconds = 0;
  }
  timeDisplay.text((minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
  nextText.text(text);
}

//main Pomodoro
function startPomodoroInterval() {
  Swal.fire({
    title: "It's time for break!",
    text: "What would you like to do next?",
    // icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#116C14',
    cancelButtonColor: '#CBC0C0',
    confirmButtonText: 'Yes, delete it!',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Meditation',
    denyButtonText: `View Latest News`,
    imageUrl: './assets/images/meditation-news.png',
    imageWidth: 400,
    imageHeight: 200,
  }).then((result) => {
    if (result.isConfirmed) {
      //Show Meditation Modal
    } else if (result.isDenied) {
      //Show News Panel
      $("#rightPanelButton").trigger("click");
    }
  })

  timeContainer.addClass('studyColour');
  timeContainer.removeClass('shortBColour');
  timeContainer.removeClass('longBColour');

  workDuration = moment.duration(workMinutes, 'minutes');
  console.log("Work Duration: " + workDuration);
  pomodoroInterval = setInterval(function () {

    if (!intervalPaused) {
      workDuration = moment.duration(workDuration.asMilliseconds() - interval, 'milliseconds');
    }

    if (countIntervals < 3) {
      displayTime(workDuration, "Short Break (" + shortBreak + " min)");
    } else if (countIntervals === 3) {
      displayTime(workDuration, "Long Break (" + longBreak + " min)");
    }

    // Playing an audio notification for the last 5 seconds of the time block.
    if (workDuration.asMilliseconds() <= 5000 && workDuration.asMilliseconds() >= 4000) {
      endTimeAudio.play();
    }

    if (workDuration.asMilliseconds() < 0) {
      clearInterval(pomodoroInterval);
      console.log("Value of pomodoroInterval: " + pomodoroInterval);
      countIntervals++
      console.log("Pomodoro nr " + countIntervals);
      if (countIntervals < 4) {
        if (!preventAutoBreak) {
          shortBreakStart();
        } else {
          additionalTimeEl.attr('data-next-timeblock', 'sb');
        }
      } else if (countIntervals === 4) {
        if (!preventAutoBreak) {
          longBreakStart();
        } else {
          console.log("long break*************");
          additionalTimeEl.attr('data-next-timeblock', 'lb');
        }

      }
    }
  }, interval);
}

additionalTimeEl.click(function () {
  let nextTimeBlock = additionalTimeEl.attr('data-next-timeblock');
  if (nextTimeBlock === 'sb') {
    shortBreakStart();
  } else if (nextTimeBlock === 'lb') {
    console.log("Inside Long break block*********");
    longBreakStart();
  } else if (nextTimeBlock === 'work') {
    startPomodoroInterval();
  }
});

//short break original code
function shortBreakStart() {
  timeContainer.removeClass('studyColour');
  timeContainer.addClass('shortBColour');
  timeContainer.removeClass('longBColour');

  //Show the user a modal to choose between meditation and the news.

  shortBreakDuration = moment.duration(shortBreak, 'minutes');
  console.log("short break")
  shortBreakInterval = setInterval(function () {
    if (!intervalPaused) {
      shortBreakDuration = moment.duration(shortBreakDuration.asMilliseconds() - interval, 'milliseconds');
    }
    displayTime(shortBreakDuration, "Work (" + workMinutes + " min)");

    // Playing an audio notification for the last 5 seconds of the time block.
    if (shortBreakDuration.asMilliseconds() <= 5000 && shortBreakDuration.asMilliseconds() >= 4000) {
      endTimeAudio.play();
    }

    if (shortBreakDuration.asMilliseconds() < 0) {
      clearInterval(shortBreakInterval);

      if (!preventAutoWork) { //function to run only if prevent autostart is not toggled on
        startPomodoroInterval();
      } else {
        additionalTimeEl.attr('data-next-timeblock', 'work');
      }

    }
  }, interval);
}


//short break attempted code with toggle button
// function shortBreakStart() {
//   if (!preventAutoBreak) { 
//     shortBreakToggled();
//   } else if (workDuration.asMilliseconds() < 0) {
//     $("#additionalTimerInfo").click(function(){
//       // preventAutoBreak = false;
//       shortBreakToggled();
//       preventAutoBreak = true;
//     });
//   }

//   function shortBreakToggled() {
//     timeContainer.removeClass("studyColour");
//     timeContainer.addClass("shortBColour");
//     timeContainer.removeClass("longBColour");

//     shortBreakDuration = moment.duration(shortBreak, "minutes");
//     console.log("short break");
//     shortBreakInterval = setInterval(function() {
//       if (!intervalPaused) {
//         shortBreakDuration = moment.duration(
//           shortBreakDuration.asMilliseconds() - interval,
//           "milliseconds"
//         );
//       }
//       displayTime(shortBreakDuration, "Work (" + workMinutes + " min)");
//   // Playing an audio notification for the last 5 seconds of the time block.
//       if (shortBreakDuration.asMilliseconds() <= 5000 && shortBreakDuration.asMilliseconds() >= 4000) {
//         endTimeAudio.play();
//       }

//       if (shortBreakDuration.asMilliseconds() < 0) {
//         clearInterval(shortBreakInterval);
//         if (!preventAutoWork) { //if condition is met (the toggle button is not on), then the function will run automatically
//           startPomodoroInterval();
//         }
//       }
//     }, interval);
//   }
// }

//long break
function longBreakStart() {
  timeContainer.removeClass('studyColour');
  timeContainer.removeClass('shortBColour');
  timeContainer.addClass('longBColour');
  longBreakDuration = moment.duration(longBreak, 'minutes');
  console.log("long break");

  longBreakInterval = setInterval(function () {
    if (!intervalPaused) {
      longBreakDuration = moment.duration(longBreakDuration.asMilliseconds() - interval, 'milliseconds');
    }
    displayTime(longBreakDuration, "Work Block (" + workMinutes + " min)");

    // Playing an audio notification for the last 5 seconds of the time block.
    if (longBreakDuration.asMilliseconds() <= 5000 && longBreakDuration.asMilliseconds() >= 4000) {
      endTimeAudio.play();
    }

    if (longBreakDuration.asMilliseconds() < 0) {
      clearInterval(longBreakInterval);
      //resetting pomodoro
      countIntervals = 0;
      if (!preventAutoWork) { //function to run only if prevent autostart is not toggled on
        startPomodoroInterval();
      } else {
        additionalTimeEl.attr('data-next-timeblock', 'work');
      }
    }
  }, interval);
}

