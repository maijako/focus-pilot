// //A variable to set count to how many times pomodoro and break functions run
// var count = 0;

// //code block to run timer
// $("#startPomodoroTimer").on("click", function(evt){
//   evt.preventDefault();
  
// //variables added inside the on click function, because otherwise user values display as NaN in the timer
//   var timeDisplay = $("#countdownTimer");
//   var nextText = $("#whatsNext");
//   var workMinutes = $("#pomodoroTimer").val();
//   var shortBreak = $("#shortBreak").val();
//   var longBreak = $("#longBreak").val();
  
// // Check if the user values are null, and if so, set them to the default value
//   if (workMinutes === '') {
//     workMinutes = 25;
//   } else {
//     workMinutes = parseInt(workMinutes);
//   }

//   if (shortBreak === '') {
//     shortBreak = 5;
//   } else {
//     shortBreak = parseInt(shortBreak);
//   }

//   if (longBreak === '') {
//     longBreak = 15;
//   } else {
//     longBreak = parseInt(longBreak);
//   }


// //moment.duration methods for the timer
//   var workDuration = moment.duration(workMinutes, 'minutes');
//   var shortBreakDuration = moment.duration(shortBreak, 'minutes');
//   var longBreakDuration = moment.duration(longBreak, 'minutes');
//   var interval = 1000;
//   var pomodoroInterval;


// //function to display Time in the main block
//   function displayTime(duration, text) {
//     var minutes = duration.minutes();
//     var seconds = duration.seconds();
//     if (seconds < 0) {
//       seconds = 0;
//     }
//     timeDisplay.text((minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
//     nextText.text(text);
//   }
  
// //function to start pomodoros
//   function startPomodoroInterval(){
// //re-setting workDuration so it starts from the original user input value again
//   workDuration = moment.duration(workMinutes, 'minutes');
//   pomodoroInterval = setInterval(function(){
//     workDuration = moment.duration(workDuration.asMilliseconds() - interval, 'milliseconds');
//     if (workDuration.asMilliseconds() < 0) {
//       clearInterval(pomodoroInterval);
//       count++;
//       if (count < 3){
//         shortBreakStart();
//         displayTime(workDuration, "Short Break ("+shortBreak+" min)");
//         } else if (count === 3) {
//           longBreakStart();
//           displayTime(workDuration, "Long Break ("+longBreak+" min)");
//         }
//     // } else {
//     //   displayTime(workDuration);
//     }
//   }, interval);
//   }
  
//   startPomodoroInterval();

//   function shortBreakStart(){
//     shortBreakDuration = moment.duration(shortBreak, 'minutes');
//     shortBreakInterval = setInterval(function(){
//       shortBreakDuration = moment.duration(shortBreakDuration.asMilliseconds() - interval, 'milliseconds');
//       if (shortBreakDuration.asMilliseconds() < 0) {
//         clearInterval(shortBreakInterval);
//         startPomodoroInterval();
//         } else {
//           displayTime(shortBreakDuration, "Work block ("+workMinutes+" min)");
//         }
//     }, interval);
//   }

//   function longBreakStart(){
//     longBreakDuration = moment.duration(longBreak, 'minutes');
//     longBreakInterval = setInterval(function(){
//       longBreakDuration = moment.duration(longBreakDuration.asMilliseconds() - interval, 'milliseconds');
//       count = 0;
//       if (longBreakDuration.asMilliseconds() < 0) {
//         clearInterval(longBreakInterval);
//         startPomodoroInterval();
//       } else {
//         displayTime(longBreakDuration, "Work block ("+workMinutes+" min)");
//       }
//     }, interval);
//   }


// });

var count = 0;
var workDuration, shortBreakDuration, longBreakDuration, interval, pomodoroInterval;
var timeDisplay = $("#countdownTimer");
var nextText = $("#whatsNext");

$("#startPomodoroTimer").on("click", function(evt){
  evt.preventDefault();
  
  var workMinutes = $("#pomodoroTimer").val() || 25;
  var shortBreak = $("#shortBreak").val() || 5;
  var longBreak = $("#longBreak").val() || 15;

  workDuration = moment.duration(workMinutes, 'minutes');
  shortBreakDuration = moment.duration(shortBreak, 'minutes');
  longBreakDuration = moment.duration(longBreak, 'minutes');
  interval = 1000;
  
  function displayTime(duration, text) {
    var minutes = duration.minutes();
    var seconds = duration.seconds();
    if (seconds < 0) {
      seconds = 0;
    }
    timeDisplay.text((minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
    nextText.text(text);
  }
  
  function startPomodoroInterval(){
    workDuration = moment.duration(workMinutes, 'minutes');
    pomodoroInterval = setInterval(function(){
      workDuration = moment.duration(workDuration.asMilliseconds() - interval, 'milliseconds');
      displayTime(workDuration, "Work block ("+workMinutes+" min)");
      if (workDuration.asMilliseconds() < 0) {
        clearInterval(pomodoroInterval);
        count++;
        if (count < 3){
          shortBreakStart();
        } else if (count === 3) {
          longBreakStart();
        }
      }
    }, interval);
  }
  
  function shortBreakStart(){
    shortBreakInterval = setInterval(function(){
      shortBreakDuration = moment.duration(shortBreakDuration.asMilliseconds() - interval, 'milliseconds');
      displayTime(shortBreakDuration, "Short Break ("+shortBreak+" min)");
      if (shortBreakDuration.asMilliseconds() < 0) {
        clearInterval(shortBreakInterval);
        startPomodoroInterval();
        } 
    }, interval);
  }

  function longBreakStart(){
    longBreakInterval = setInterval(function(){
      longBreakDuration = moment.duration(longBreakDuration.asMilliseconds() - interval, 'milliseconds');
      displayTime(longBreakDuration, "Long Break ("+longBreak+" min)");
      if (longBreakDuration.asMilliseconds() < 0) {
        clearInterval(longBreakInterval);
        count = 0;
        startPomodoroInterval();
      } 
    }, interval);
  }

  startPomodoroInterval();
});
