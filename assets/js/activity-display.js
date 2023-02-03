//code block to run timer
$("#startPomodoroTimer").on("click", function(evt){
  evt.preventDefault();
  var workMinutes = parseInt($("#pomodoroTimer").val());
  var shortBreak = parseInt($("#shortBreak").val());
  var longBreak = parseInt($("#longBreak").val());
  var timeDisplay = $("#countdownTimer");
  var nextText = $("#whatsNext");
  var workDuration = moment.duration(workMinutes, 'minutes');
  var shortBreakDuration = moment.duration(shortBreak, 'minutes');
  var longBreakDuration = moment.duration(longBreak, 'minutes');
  var interval = 1000;
  var pomodoroInterval;

  function displayTime(duration, text) {
    var minutes = duration.minutes();
    var seconds = duration.seconds();
    timeDisplay.text((minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
    nextText.text(text);
  }

  pomodoroInterval = setInterval(function(){
    workDuration = moment.duration(workDuration.asMilliseconds() - interval, 'milliseconds');
    if (workDuration.asMilliseconds() < 0) {
      clearInterval(pomodoroInterval);
      shortBreakStart();
    } else {
      displayTime(workDuration, "Short Break ("+shortBreak+" min)");
    }
  }, interval);

  function shortBreakStart(){
    shortBreakInterval = setInterval(function(){
      shortBreakDuration = moment.duration(shortBreakDuration.asMilliseconds() - interval, 'milliseconds');
      if (shortBreakDuration.asMilliseconds() < 0) {
        clearInterval(shortBreakInterval);
        // FUNCTION TO START RUNNING MAIN POMODORO TIMER AGAIN IF IT HAS RUN LESS THAN 4 TIMES
        longBreakStart();//placeholder function call for testing purposes
      } else {
        displayTime(shortBreakDuration, "Work block ("+workMinutes+" min)");
      }
    }, interval);
  }

  function longBreakStart(){
    longBreakInterval = setInterval(function(){
      longBreakDuration = moment.duration(longBreakDuration.asMilliseconds() - interval, 'milliseconds');
      if (longBreakDuration.asMilliseconds() < 0) {
        clearInterval(longBreakInterval);
        // FUNCTION TO START RUNNING MAIN POMODORO TIMER AGAIN FROM THE BEGINNING
      } else {
        displayTime(longBreakDuration, "Work block ("+workMinutes+" min)");
      }
    }, interval);
  }
});















//_________________________________________________________________
//COMMENTED OUT CODE BELOW AS PLACEHOLDER FOR TO-DO LIST GENERATION
//_________________________________________________________________
// //Code for the appendable 'to do' list
// var todoInput = $("#todo-text");
// var todoForm = $("#todo-form");
// var todoList = $("#todo-list");
// var todoCountSpan = $("#todo-count");
// //an empty array to store todos
// var todos = [];
// //A function to store to dos as a string
// var storeTodos = function() {
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// function renderTodos() {
//   // Clear todoList element and update todoCountSpan
//   todoList.innerHTML = "";
//   todoCountSpan.textContent = todos.length;

//   // Render a new li for each todo
//   for (var i = 0; i < todos.length; i++) {
//     var todo = todos[i];

//     var li = document.createElement("li");
//     li.setAttribute("data-index", i);
//     li.textContent = todo;
//     var completeBtn = document.createElement("button");
//     completeBtn.textContent = "Complete";
//     li.appendChild(completeBtn);
//     todoList.appendChild(li);
//   }
// }

// todoList.addEventListener("click", function(event) {
//   var buttonEl = event.target;
//   if (buttonEl.matches("button")) {
//     var parentEl = buttonEl.parentElement;
//     var indexOfEl = parentEl.dataset.index;
//     todos.splice(indexOfEl, 1);
//     storeTodos();
//     renderTodos();
//   }
// })

// // When form is submitted...
// todoForm.addEventListener("submit", function(event) {
//   event.preventDefault();

//   var todoText = todoInput.value.trim();

//   // Return from function early if submitted todoText is blank
//   if (todoText === "") {
//     return;
//   }

//   // Add new todoText to todos array, clear the input
//   todos.push(todoText);
//   storeTodos();
//   todoInput.value = "";

//   // Re-render the list
//   renderTodos();
// });

// var init = function() {
//   var storedTodos = JSON.parse(localStorage.getItem("todos"));
//   if (storedTodos) {
//     todos = storedTodos;
//   }
//   renderTodos();
// }

// init();

//1s = 1000
//60000 = 1 min

