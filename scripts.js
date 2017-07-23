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

$(document).on('click', ".delete-button", function() {
  $(this).closest('.todo-card').remove();
});

// $(document).on('mouseenter', '.delete-button', function() {
//   $(this).attr('src', 'icons/delete-hover.svg');
// });

// $(document).on('mouseleave', '.delete-button', function() {
//   $(this).attr('src', 'icons/delete.svg');
// });

// $(document).on('mouseenter', '#upvote-button', function() {
//   $(this).attr('src', 'icons/upvote-hover.svg');
// });
//
// $(document).on('mouseleave', '#upvote-button', function() {
//   $(this).attr('src', 'icons/upvote.svg');
// });

$(document).on('mouseenter', '#downvote-button', function() {
  $(this).attr('src', 'icons/downvote-hover.svg');
});

$(document).on('mouseleave', '#downvote-button', function() {
  $(this).attr('src', 'icons/downvote.svg');
});

$(".todo-list").on('click', ".upvote-button", function() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.todo-importance').text();
  if (checkQualityStatus === 'swill') {
    $(this).closest('.card-quality-flex').find('.todo-importance').text('plausible');
  } else {$(this).closest('.card-quality-flex').find('.todo-importance').text('genius');
  }
});

$(".todo-list").on('click', ".downvote-button", function() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.todo-importance').text();
  if (checkQualityStatus === 'genius') {
    $(this).closest('.card-quality-flex').find('.todo-importance').text('plausible');
  } else {$(this).closest('.card-quality-flex').find('.todo-importance').text('swill');
  }
});

function FreshTodo(title, body, status) {
  this.title = title;
  this.body = body;
  this.status = "swill";
  this.id = Date.now();
}

function addCard() {
  var todoTitle = $("#todo-title").val();
  var todoBody = $("#todo-body").val();
  var todoStatus = "swill"
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
      <div class="card-quality-flex quality-spacing">
        <button src="icons/upvote.svg" class="card-buttons upvote-button" </button>
        <button src="icons/downvote.svg" class="card-buttons downvote-button" </button>
        <h3 class="quality">quality: <span class="todo-importance">${todo.status}</span></h3>
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
