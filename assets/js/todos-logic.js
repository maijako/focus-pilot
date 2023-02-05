$(document).ready(function () {
  var todoInput = $("#todo-text");
  var todoForm = $("#todo-form");
  var todoList = $("#todo-list");
  var todoCountSpan = $("#todo-count");
  var todos = [];

  //A function to store todos as a string
  var storeTodos = function () {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  //A function to display appended to-dos
  function renderTodos() {
    // Clear todoList element and update todoCountSpan
    todoList.html("");
    todoCountSpan.text(todos.length);
    // Render a new li for each todo
    for (var i = 0; i < todos.length; i++) {
      var todo = todos[i];
      var li = $("<li>");
      var completeBtn = $("<button>");
      li.attr("data-index", i);
      li.text(todo);
      completeBtn.text("Complete");
      li.append(completeBtn);
      todoList.append(li);
    }
  }

  todoList.on("click", function (event) {
    console.log("click")
    var buttonEl = $(event.target);
    if (buttonEl.is("button")) {
      var parentEl = buttonEl.parent();
      var indexOfEl = parentEl.data("index");
      todos.splice(indexOfEl, 1);
      storeTodos();
      renderTodos();
    }
  });
  //an event to add a todo item on pressing Enter
  todoForm.on("submit", function (event) {
    event.preventDefault();
    var todoText = todoInput.val().trim();
    // Return from function early if submitted todoText is blank
    if (todoText === "") {
      return;
    }
    // Add new todoText to todos array, clear the input
    todos.push(todoText);
    storeTodos();
    todoInput.val("");
    // Re-render the list
    renderTodos();
  });

  var init = function () {
    var storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      todos = storedTodos;
    }
    renderTodos();
  };

  init();
});