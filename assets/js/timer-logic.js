//set variables
var countIntervals = 0;
var workDuration, shortBreakDuration, longBreakDuration, interval, pomodoroInterval;
var timeDisplay = $("#countdownTimer");
var nextText = $("#whatsNext");
//onclick to start pomodoro timer
$("#startPomodoroTimer").on("click", function(evt){
  evt.preventDefault();
//grabbing user values from input fields, or using default if input is null
  var workMinutes = $("#pomodoroTimer").val() || 25;
  var shortBreak = $("#shortBreak").val() || 5;
  var longBreak = $("#longBreak").val() || 15;
//using moment.duration to set work and break blocks
  workDuration = moment.duration(workMinutes, 'minutes');
  shortBreakDuration = moment.duration(shortBreak, 'minutes');
  longBreakDuration = moment.duration(longBreak, 'minutes');
  interval = 1000;
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
  function startPomodoroInterval(){
    workDuration = moment.duration(workMinutes, 'minutes');
    pomodoroInterval = setInterval(function(){
      workDuration = moment.duration(workDuration.asMilliseconds() - interval, 'milliseconds');
      displayTime(workDuration, "Work block ("+workMinutes+" min)"); 
      // A counter and if statements to clear interval when it reaches 0 and to display long break after 4 pomodoros
      if (workDuration.asMilliseconds() < 0) {
        clearInterval(pomodoroInterval);
        countIntervals++
        console.log("Pomodoro nr "+ countIntervals);
        if (countIntervals < 4){
          shortBreakStart();
        } else if (countIntervals === 4) {
          longBreakStart();
        }
      }

    }, interval);
  }
//short break
  function shortBreakStart(){
    shortBreakDuration = moment.duration(shortBreak, 'minutes');
    console.log ("short break")
    shortBreakInterval = setInterval(function(){
      shortBreakDuration = moment.duration(shortBreakDuration.asMilliseconds() - interval, 'milliseconds');
      displayTime(shortBreakDuration, "Short break ("+shortBreak+" min)");
      if (shortBreakDuration.asMilliseconds() < 0) {
        clearInterval(shortBreakInterval);
        startPomodoroInterval();
        } 
    }, interval);
  }
//long break
  function longBreakStart(){
    longBreakDuration = moment.duration(longBreak, 'minutes');
    console.log("long break")
    longBreakInterval = setInterval(function(){
      longBreakDuration = moment.duration(longBreakDuration.asMilliseconds() - interval, 'milliseconds');
      displayTime(longBreakDuration, "Long break ("+longBreak+" min)");
      if (longBreakDuration.asMilliseconds() < 0) {
        clearInterval(longBreakInterval);
        //resetting pomodoro
        countIntervals = 0;
        startPomodoroInterval();
      } 
    }, interval);
  }

  startPomodoroInterval();
});
