  onPageLoad()


$(".todo-list").on('click', '.upvote-button', upvote);
$(".todo-list").on('click', '.downvote-button', downvote);
$(".todo-list").on('click', ".delete-button", deleteTodo)
$('.todo-list').on('keyup', 'h2', enterTextinTitle);
$('.todo-list').on('keyup', 'p', enterTextinBody);


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


function sendTodoToStorage(FreshTodo) {
  localStorage.setItem(FreshTodo.id, JSON.stringify(FreshTodo));
}

function getTodoFromStorage() {
  if (localStorage.getItem('todoArray')) {
    todoArray = JSON.parse(localStorage.getItem("todoArray"));
    todoArray.forEach(function(element) {
      prependCard(element);
    });
  } else {
    alert('You do not have any of your shit in here');
  }
}


function onPageLoad(){
  for (i = 0; i < localStorage.length; i++) {
    prependCard(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
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
    `<div class="todo-card" id="${todo.id}">
      <div class="card-title-flex">
        <h2 contenteditable=true>${todo.title}</h2>
        <button src="icons/delete.svg" class="card-buttons delete-button" </button>
      </div>
      <p contenteditable=true>${todo.body}</p>
      <div class="card-importance-flex importance-spacing">
        <button src="icons/upvote.svg" class="card-buttons upvote-button" ></button>
        <button src="icons/downvote.svg" class="card-buttons downvote-button" ></button>
        <h3 class="importance">Importance: <span class="todo-importance">${todo.importance}</span></h3>
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

$('#search-bar').keyup(function(){
  var searchInputVal = $(this).val();
  var todoArray = JSON.parse(localStorage.getItem("todoArray"));
  console.log(todoArray);
  var matchingText = todoArray.filter(function(element) {
    return element.title.includes(searchInputVal) || element.body.includes(searchInputVal);
    console.log(matchingText);
  });
  $(".todo-list").remove();
  for (var i = 0; i < matchingText.length; i++) {
    prependCard(matchingText[i]);
    console.log(matchingText);
  }
  // $(".todo-card").each(function(todoCard) {
  //   console.log(todoCard);
  });

// });
