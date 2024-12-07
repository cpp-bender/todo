const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

form.addEventListener("submit", addTodo);

document.addEventListener("DOMContentLoaded", loadAllTodos);

function loadAllTodos(e){
    const todos = JSON.parse(localStorage.getItem("todos"));
    for(let i = 0; i<todos.length; i++){
        addTodoToUI(todos[i]);
    }
}

function addTodo(e){
    e.preventDefault();
    const newTodo =  todoInput.value.trim();

    if(newTodo === ""){
        showAlert("danger", "Type a todo");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Success!");
    }
}

function addTodoToStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos =JSON.parse(localStorage.getItem("todos")); 
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, mes){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `<strong>${mes}</strong>`;
    firstCardBody.appendChild(alert);

    window.setTimeout(function(){
        alert.remove();
    }, 1000);
}

function addTodoToUI(newTodo){
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