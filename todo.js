const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

form.addEventListener("submit", addTodo);

document.addEventListener("DOMContentLoaded", loadAllTodos);

secondCardBody.addEventListener("click", deleteTodo);

filter.addEventListener("keyup", filterTodos);

clearButton.addEventListener("click", clearAllTodos);

function clearAllTodos(e) {
  if (confirm("Are you sure, you want to delete all?")) {
    do {
      todoList.removeChild(todoList.firstElementChild);
    } while (todoList.firstElementChild != null);
    localStorage.removeItem("todos");
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (item) {
    const text = item.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      item.setAttribute("style", "display : none !important");
    } else {
      item.setAttribute("style", "display : block");
    }
  });
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    const text = e.target.parentElement.parentElement.textContent;
    const todos = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < todos.length; i++) {
      if (todos[i] === text) {
        todos.splice(i, 1);
      }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    showAlert("success", "Todo removed");
  }
}

function loadAllTodos(e) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  for (let i = 0; i < todos.length; i++) {
    addTodoToUI(todos[i]);
  }
}

function addTodo(e) {
  e.preventDefault();
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Type a todo");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Success!");
  }
}

function addTodoToStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, mes) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `<strong>${mes}</strong>`;
  firstCardBody.appendChild(alert);

  window.setTimeout(function () {
    alert.remove();
  }, 1000);
}

function addTodoToUI(newTodo) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  listItem.className = "list-group-item d-flex justify-content-between";
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  todoList.appendChild(listItem);
  todoInput.value = "";
}
