//set variables
var countIntervals = 0;
var workDuration, shortBreakDuration, longBreakDuration, interval;
var pomodoroInterval, longBreakInterval, shortBreakInterval;
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
    console.log("Work Duration: "+workDuration);
    pomodoroInterval = setInterval(function(){
      workDuration = moment.duration(workDuration.asMilliseconds() - interval, 'milliseconds');

      if(countIntervals < 3){
        displayTime(workDuration, "Short Break ("+shortBreak+" min)"); 
      }else if(countIntervals === 3){
        displayTime(workDuration, "Long Break ("+longBreak+" min)"); 
      }
      
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
      displayTime(shortBreakDuration, "Work Block ("+workMinutes+" min)");
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
      displayTime(longBreakDuration, "Work Block ("+workMinutes+" min)");
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
