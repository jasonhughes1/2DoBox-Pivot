onPageLoad()


$(".todo-list").on('click', '.upvote-button', upvote);
$(".todo-list").on('click', '.downvote-button', downvote);
$(".todo-list").on('click', ".delete-button", deleteTodo)
$('.todo-list').on('keyup', 'h2', enterTextinTitle);
$('.todo-list').on('keyup', 'p', enterTextinBody);
$('.todo-list').on('click', '.complete-button', completedTask);

$('#search-bar').on('keyup', filtertodo);
$('#completed-todos-button').on('click', showCompletedTasks)


$('#critical-button').on('click', criticalTodo)
$('#high-button').on('click', highTodo)
$('#normal-button').on('click', normalTodo)
$('#low-button').on('click', lowTodo)
$('#none-button').on('click', noneTodo)
$('#showall-button').on('click', showAllTodo)


$("#todo-body, #todo-title").keyup(function() {
  if (($("#todo-title").val() !== "") || ($("#todo-body").val() !== "")) {
    $("#save-button").removeAttr("disabled");
  }
});

$("#save-button").on('click', function(event) {
  event.preventDefault();
  evalInputs();
  $("#save-button").attr("disabled", "disabled");
});

function deleteTodo (){
  var key = $(this).closest('.todo-card').prop('id')
  localStorage.removeItem(key);
  $(this).closest('.todo-card').remove();
}

function FreshTodo(title, body) {
  this.title = title;
  this.body = body;
  this.importance = 'Normal';
  this.id = Date.now();
  this.completed = false;
}

function addCard() {
  var todoTitle = $("#todo-title").val();
  var todoBody = $("#todo-body").val();
  var newTodo = new FreshTodo(todoTitle, todoBody);
  prependCard(newTodo);
  sendTodoToStorage(newTodo);
};


function upvote() {
  var importance = ['None', 'Low', 'Normal', 'High', 'Critical']
  var todoKey = $(this).closest('.todo-card').prop('id');
  var todoCard = JSON.parse(localStorage.getItem(todoKey));
  var currentImportance = $(this).closest('.card-importance-flex').find('.todo-importance').text();
  var currentIndex = importance.indexOf(currentImportance);
  $(this).closest('.card-importance-flex').find('.todo-importance').text(importance[currentIndex + 1]);
  todoCard.importance = $(this).closest('.card-importance-flex').find('.todo-importance').text();
  localStorage.setItem(todoKey, JSON.stringify(todoCard));
}

function downvote() {
  var importance = ['None', 'Low', 'Normal', 'High', 'Critical']
  var todoKey = $(this).closest('.todo-card').prop('id');
  var todoCard = JSON.parse(localStorage.getItem(todoKey));
  var currentImportance = $(this).closest('.card-importance-flex').find('.todo-importance').text();
  var currentIndex = importance.indexOf(currentImportance);
  $(this).closest('.card-importance-flex').find('.todo-importance').text(importance[currentIndex - 1]);
  todoCard.importance = $(this).closest('.card-importance-flex').find('.todo-importance').text();
  localStorage.setItem(todoKey, JSON.stringify(todoCard));
}

function criticalTodo () {
  $(".todo-list").empty();
  var criticalTodo = getToDoFromLocalStorage().filter(function(todoObject) {
    return todoObject.importance === 'Critical'
  })
  filterThroughArray(criticalTodo);
}

function highTodo () {
  $(".todo-list").empty();
  var highTodo = getToDoFromLocalStorage().filter(function(todoObject) {
    return todoObject.importance === 'High'
  })
  filterThroughArray(highTodo);
}


function normalTodo () {
  $(".todo-list").empty();
  var normalTodo = getToDoFromLocalStorage().filter(function(todoObject) {
    return todoObject.importance === 'Normal'
  })
  filterThroughArray(normalTodo);
}

function lowTodo () {
  $(".todo-list").empty();
  var lowTodo = getToDoFromLocalStorage().filter(function(todoObject) {
    return todoObject.importance === 'Low'
  })
  filterThroughArray(lowTodo);
}


function noneTodo () {
  $(".todo-list").empty();
  var noneTodo = getToDoFromLocalStorage().filter(function(todoObject) {
    return todoObject.importance === 'None'
  })
  filterThroughArray(noneTodo);
}

function showAllTodo () {
  $(".todo-list").empty();
  onPageLoad();
  showCompletedTasks();
}


function completedTask () {
  var todoKey = $(this).closest('.todo-card').prop('id');
  var todoCard = JSON.parse(localStorage.getItem(todoKey));
  $(this).closest('.todo-card').toggleClass('todo-card-completed');
  if(todoCard.completed === false) {
    todoCard.completed = 'todo-card-completed';
  } else {
    todoCard.completed = false;
  }
  localStorage.setItem(todoKey, JSON.stringify(todoCard));
}


function sendTodoToStorage(FreshTodo) {
  localStorage.setItem(FreshTodo.id, JSON.stringify(FreshTodo));
}


function displayCompletedTaskResults(taskResults) {
  taskResults.forEach(function(item) {
    prependCard(item);
  });
}


function onPageLoad(){
  filterThroughArray(getToDoFromLocalStorage());
}


function filterThroughArray (array) {
  console.log(array);
  array.forEach(function(todo) {
    prependCard(todo);
})
  $('.todo-card-completed').hide();

}


function showCompletedTasks () {
  $('.todo-card-completed').show();
}


function enterTextinTitle () {
  var todoKey = $(this).closest('.todo-card').prop('id');
  var todoCard = JSON.parse(localStorage.getItem(todoKey));
  todoCard.title = $(this).text();
  localStorage.setItem(todoKey, JSON.stringify(todoCard));
}

function enterTextinBody () {
  var todoKey = $(this).closest('.todo-card').prop('id');
  var todoCard = JSON.parse(localStorage.getItem(todoKey));
  todoCard.body = $(this).text();
  localStorage.setItem(todoKey, JSON.stringify(todoCard));
}


function prependCard(todo) {
  $('.todo-list').prepend(
    `<div class="todo-card ${todo.completed}" id="${todo.id}">
      <div class="card-title-flex">
        <h2 contenteditable=true>${todo.title}</h2>
        <button src="icons/delete.svg" class="card-buttons delete-button" </button>
      </div>
      <p contenteditable=true>${todo.body}</p>
      <div class="card-importance-flex importance-spacing">
        <button src="icons/upvote.svg" class="card-buttons upvote-button" ></button>
        <button src="icons/downvote.svg" class="card-buttons downvote-button" ></button>
        <h3 class="importance">Importance: <span class="todo-importance">${todo.importance}</span></h3><h3 class="complete-text">Completed Task</h3><button src ="icons/complete.svg" class = "card-buttons complete-button"></button>
      </div>
    </div>`
  );
};


function resetInputs() {
  $('#todo-title').val('');
  $('#todo-body').val('');
};


function evalInputs() {
  var todoTitle = $("#todo-title").val();
  var todoBody = $("#todo-body").val();
  if (!todoTitle) {
    return alert("Please enter a title.");
  } else if (!todoBody) {
    return alert ("Please enter something in the body.");
  } else {
    addCard();
    resetInputs();
  }
};

function filtertodo(){
  var filteredTodo = [];
  var searchInputVal = $(this).val().toUpperCase();
  var parsedArray = getToDoFromLocalStorage();
  var matchingText = parsedArray.filter(function(item){
    return item.title.toUpperCase().includes(searchInputVal) || item.body.toUpperCase().includes(searchInputVal)
  })
  if (matchingText.length !== "") {
    displayMatchingResults(matchingText);
  }
}

function getToDoFromLocalStorage(){
  var todos = [];
  for (var i = 0; i < localStorage.length; i++) {
    todos.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  return todos;
}

function displayMatchingResults(matchingResults) {
  $('.todo-list').empty();
  matchingResults.forEach(function(item) {
    prependCard(item);
  });
}
