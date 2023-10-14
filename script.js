const imput = document.querySelector(".input");
const form = document.querySelector(".form");
const list = document.querySelector(".List");
const deleteButton = document.getElementById("deleteCompleted");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  console.log(todos);
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = imput.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText === "") {
    alert("Please enter a task!");
  } else {
    const list_item = document.createElement("li");
    const trashCanContainer = document.createElement("div");
    trashCanContainer.className = "trashContainer";

    const trashcan = document.createElement("span");
    trashcan.className = "trashcan";
    trashcan.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    if (todo && todo.completed) {
      console.log(todo);
      list_item.classList.add("completed");
      trashCanContainer.classList.add("show");
      console.log("completed added");
    }

    list_item.textContent = todoText;
    trashCanContainer.appendChild(trashcan);
    list_item.appendChild(trashCanContainer);

    trashcan.addEventListener("click", () => {
      list.removeChild(list_item);
    });

    list_item.addEventListener("click", () => {
      list_item.classList.toggle("completed");
      trashCanContainer.classList.toggle("show");
      updateLS();
    });
    list.appendChild(list_item);
  }

  imput.value = "";
  updateLS();
}

//update local storate
function updateLS() {
  const todosEl = document.querySelectorAll("li");
  let todo = [];
  todosEl.forEach((todoEL) => {
    todo.push({
      text: todoEL.innerText,
      completed: todoEL.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todo));
}

deleteButton.addEventListener("click", () => deleteButtonAction());

function deleteButtonAction() {
  const completedTasks = document.querySelectorAll("li.completed");
  console.log(completedTasks);
  completedTasks.forEach((task) => {
    list.removeChild(task);
  });
  updateLS();
}
