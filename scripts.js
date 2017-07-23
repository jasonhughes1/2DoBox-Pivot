var todoArray = [];

$(document).ready(function() {
  getTodoFromStorage();
});

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

$(".todo-list").on('click', ".delete-button", function() {
  $(this).closest('.todo-card').remove();
});

$(".todo-list").on('click', ".upvote-button", function() {
  var checkImportanceStatus = $(this).closest('.card-importance-flex').find('.todo-importance').text();
  if (checkImportanceStatus === 'Normal') {
    $(this).closest('.card-importance-flex').find('.todo-importance').text('High');
  } else {$(this).closest('.card-importance-flex').find('.todo-importance').text('Critical');
  }
});

$(".todo-list").on('click', ".downvote-button", function() {
  var checkImportanceStatus = $(this).closest('.card-importance-flex').find('.todo-importance').text();
  if (checkImportanceStatus === 'Critical') {
    $(this).closest('.card-importance-flex').find('.todo-importance').text('High');
  } else {$(this).closest('.card-importance-flex').find('.todo-importance').text('Normal');
  }
});

function FreshTodo(title, body, status) {
  this.title = title;
  this.body = body;
  this.status = "Normal";
  this.id = Date.now();
}

function addCard() {
  var todoTitle = $("#todo-title").val();
  var todoBody = $("#todo-body").val();
  var todoStatus = "Normal"
  var newTodo = new FreshTodo(todoTitle, todoBody, todoStatus);
  prependCard(newTodo);
  todoArray.push(newTodo);
  sendTodoToStorage();
};

function sendTodoToStorage() {
  localStorage.setItem("todoArray", JSON.stringify(todoArray));
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

$('.todo-list').on('keyup', 'h2', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.blur();
  }
  var id = $(this).closest('.todo-card')[0].id;
  var title = $(this).text();
  todoArray.forEach(function(card) {
    if (card.id == id) {
      card.title = title;
    }
  });
  sendTodoToStorage();
});

$('.todo-list').on('keyup', 'p', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.blur();
  }
  var id = $(this).closest('.todo-card')[0].id;
  var body = $(this).text();
  todoArray.forEach(function(card) {
    if (card.id == id) {
      card.body = body;
    }
  });
  sendTodoToStorage();
});

function prependCard(todo) {
  $('.todo-list').prepend(
    `<div class="todo-card" id="${todo.id}">
      <div class="card-title-flex">
        <h2 contenteditable=true>${todo.title}</h2>
        <button src="icons/delete.svg" class="card-buttons delete-button" </button>
      </div>
      <p contenteditable=true>${todo.body}</p>
      <div class="card-importance-flex importance-spacing">
        <button src="icons/upvote.svg" class="card-buttons upvote-button" </button>
        <button src="icons/downvote.svg" class="card-buttons downvote-button" </button>
        <h3 class="importance">Importance: <span class="todo-importance">${todo.status}</span></h3>
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
