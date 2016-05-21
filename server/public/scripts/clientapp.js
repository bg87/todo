$(document).ready(function () {

  appendTodos();

  $('.add').on('click', addTodo);

  $('.todos').on('click', 'div', function () {
    completed($(this));
  });

  $('.delete').on('click', deleteCompleted);
});

function deleteCompleted () {
  $.ajax({
		type: 'DELETE',
		url: '/todo',
		success: function() {
			appendTodos();
		}
	});
}

function completed (element) {
  var id = {"id" : element.prop("id")}
  if (element.hasClass("complete")) {
     id["bool"] = false;
     element.removeClass("complete").addClass("incomplete");
  } else {
     id["bool"] = true;
     element.removeClass("incomplete").addClass("complete");
  }
  $.ajax({
    type     : 'PUT',
    url      : '/todo',
    data     : id,
    success  : function () {
      appendTodos();
     }
  });
}

function appendTodos () {
  $.ajax({
    type   : 'GET',
    url    : '/todo',
    success: function (res) {
      $('.todos').empty();
      for (var i = 0; i < res.length; i++) {
        if (res[i].complete != true) {
          $('.todos').append('<div class="incomplete" id="' + res[i].id + '">' + res[i].todo + '</div>');
        } else {
          $('.todos').append('<div class="complete" id="' + res[i].id + '">' + res[i].todo + '</div>');
        }
      }
    }
  });
}

function addTodo () {
  event.preventDefault();
  var todo = {}
  $.each($('.newTodo').serializeArray(), function(i, field) {
		todo[field.name] = field.value;
	});
  if (todo.new == "") {
    $('.addInput').attr('placeholder', "You have to add a todo!")
  } else {
  $.ajax({
		type   : 'POST',
		url    : '/todo',
		data   : todo,
		success: function(success) {
			appendTodos();
		}
	});
}
}
