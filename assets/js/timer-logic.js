//set variables
var countIntervals = 0;
var workDuration, shortBreakDuration, longBreakDuration, interval;
var pomodoroInterval, longBreakInterval, shortBreakInterval;
var intervalPaused;
// var autostartBreaks; //var to store autostart preference for breaks
// var autostartWork; //var to store autostart preference for work
var timeDisplay = $("#countdownTimer");
var timeContainer = $('#countdownTimerContainer')
var nextText = $("#whatsNext");
var workMinutes, shortBreak, longBreak;
var endTimeAudio = new Audio("assets/audio/end_of_time_sound.wav");

var initializeTimer = function() {
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
  // autostartBreaks = false; //setting not autostart break as default
  // autostartWork = false; //setting not autostart work as default
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
  function startPomodoroInterval(){
    timeContainer.addClass('studyColour');
    timeContainer.removeClass('shortBColour');
    timeContainer.removeClass('longBColour');

    workDuration = moment.duration(workMinutes, 'minutes');
    console.log("Work Duration: "+workDuration);
    pomodoroInterval = setInterval(function(){

      if(!intervalPaused){
        workDuration = moment.duration(workDuration.asMilliseconds() - interval, 'milliseconds');
      }

      if(countIntervals < 3){
        displayTime(workDuration, "Short Break ("+shortBreak+" min)"); 
      }else if(countIntervals === 3){
        displayTime(workDuration, "Long Break ("+longBreak+" min)"); 
      }
      
      // Playing an audio notification for the last 5 seconds of the time block.
      if(workDuration.asMilliseconds() <= 5000 && workDuration.asMilliseconds() >= 4000) {
        endTimeAudio.play();
      }
      
      if (workDuration.asMilliseconds() < 0) {
        clearInterval(pomodoroInterval);
        console.log("Value of pomodoroInterval: "+pomodoroInterval);
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
    if(!preventAutostart){
    timeContainer.removeClass('studyColour');
    timeContainer.addClass('shortBColour');
    timeContainer.removeClass('longBColour');

    shortBreakDuration = moment.duration(shortBreak, 'minutes');
    console.log ("short break")
    shortBreakInterval = setInterval(function(){
      if(!intervalPaused){
        shortBreakDuration = moment.duration(shortBreakDuration.asMilliseconds() - interval, 'milliseconds');
      }
      displayTime(shortBreakDuration, "Work ("+workMinutes+" min)");

      // Playing an audio notification for the last 5 seconds of the time block.
      if(shortBreakDuration.asMilliseconds() <= 5000 && shortBreakDuration.asMilliseconds() >= 4000) {
        endTimeAudio.play();
      }

      if (shortBreakDuration.asMilliseconds() < 0) {
        clearInterval(shortBreakInterval);
        startPomodoroInterval();
        } 
    }, interval);
  }
  }
//long break
  function longBreakStart(){
    timeContainer.removeClass('studyColour');
    timeContainer.removeClass('shortBColour');
    timeContainer.addClass('longBColour');
    longBreakDuration = moment.duration(longBreak, 'minutes');
    console.log("long break")
    longBreakInterval = setInterval(function(){
      if(!intervalPaused){
        longBreakDuration = moment.duration(longBreakDuration.asMilliseconds() - interval, 'milliseconds');
      }
      displayTime(longBreakDuration, "Work Block ("+workMinutes+" min)");

      // Playing an audio notification for the last 5 seconds of the time block.
      if(longBreakDuration.asMilliseconds() <= 5000 && longBreakDuration.asMilliseconds() >= 4000) {
        endTimeAudio.play();
      }

      if (longBreakDuration.asMilliseconds() < 0) {
        clearInterval(longBreakInterval);
        //resetting pomodoro
        countIntervals = 0;
        startPomodoroInterval();
      } 
    }, interval);
  }

