//Starter code for pomodoro timer 
var userWorkTime = $("#pomodoroTimer").val();



var timeDisplay = $("#countdownTimer");
startTime = moment(userWorkTime+':00', 'mm:ss');

var pomodoroInterval;
//Code to set countdown timer
$("#startPomodoroTimer").on("click", function(evt){
  evt.preventDefault();
  console.log(startTime.format('mm:ss'));
console.log(startTime)


  pomodoroInterval = setInterval(() => {
    startTime.subtract(1, 'seconds');
    timeDisplay.text(startTime.format('mm:ss'));
    if (startTime.format('mm:ss') === '00:00') {
        clearInterval(pomodoroInterval);
    }
  }, 1000);
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

