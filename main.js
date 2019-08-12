// Some event handlers.
const deleteButton = document.querySelector('.delete-completed-todos');
deleteButton.onclick = handleDelete;
const addButton = document.querySelector('.add-todo');
addButton.onclick = addToList;

// Our new array of objects!
let todos = [
  {
    name: `Be able to mark todos "done".`,
    completed: false,
    date: getCurrentDateAndTime(),
    priority: 1
  },
  {
    name: `Allow user interaction through the DOM`,
    completed: false,
    date: getCurrentDateAndTime(),
    priority: 2
  },
  {
    name: `Add dates to todos.`,
    completed: false,
    date: getCurrentDateAndTime(),
    priority: 1
  },
]

// Populate the dom with our example todos.
printList();

// Get the current date and time.
function getCurrentDateAndTime() {
  return new Date().toLocaleString();
}

// Print a todo to the DOM.
function printTodo(todo, todoIndex) {
  const ol = document.querySelector('.todo-list');
  
  const li = document.createElement('li');
  li.id = todoIndex;
  
  const todoNameItem = document.createElement('p');
  const todoDateItem = document.createElement('p');
  todoNameItem.innerText = todo.name;
  todoDateItem.innerText = todo.date;
  if (todo.priority === 2) {
    li.style.fontWeight = 'bold';
  }

  li.appendChild(todoNameItem);
  li.appendChild(todoDateItem);

  todoNameItem.onclick = handleMark;
  todoDateItem.onclick = handleMark;

  ol.appendChild(li);
}

// Prints everything from our data to the DOM.
function printList() {
  let i = 0;
  while (i < todos.length) {
    printTodo(todos[i], i);

    i = i + 1;
  }
}

// Add a todo to the data.
function addTodo(newTodo) {
  todos.push(newTodo);
}

// Add the user's input as a todo into the data and the dom.
function addToList() {
  const inputBox = document.querySelector('.todo-input');
  const todoName = inputBox.value;
  const todoDate = getCurrentDateAndTime();
  const priorityInput = document.querySelector('.priority-pulldown');
  const todoPriority = Number(priorityInput.value);
  const newTodo = {
    name: todoName,
    completed: false,
    date: todoDate,
    priority: todoPriority,
  }
  addTodo(newTodo);
  printTodo(newTodo, todos.length - 1);

  inputBox.value = '';
}

// Toggle a clicked todo.
function handleMark(event) {
  // Get the li
  const li = event.target.parentNode;

  // Get the li's index.

  // Method 1:
  // const ul = document.querySelector('.todo-list');
  // const listItems = Array.from(ul.childNodes);
  // const index = listItems.indexOf(li);

  // Alternate method to getting the index:
  const index = Number(li.id);


  printMark(index);
  markComplete(index);
}

// Toggle a given todo's completeness in the data.
function markComplete(index) {
  if (todos[index].completed === true) {
    todos[index].completed = false;
  } else {
    todos[index].completed = true;
  }
}

// Print the appropriate completeness mark to the dom for a given todo.
function printMark(index) {
  const li = document.querySelector(`li:nth-child(${index + 1})`);
  
  if (todos[index].completed === true) {
    li.style.textDecoration = '';
  } else {
    li.style.textDecoration = 'line-through';
  }
}

// Delete an item from the data and dom.
function handleDelete() {
  const newTodos = [];

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].completed === false) {
      newTodos.push(todos[i]);
    }
  }

  todos = newTodos;
  clearList();
  printList();
}

// Remove all todos from the dom.
function clearList() {
  // Grab the todo list ul and put it in a variable
  const list = document.querySelector('.todo-list');

  // Remove all children of that list.
  while (list.hasChildNodes()) {
    list.firstChild.remove();
  }
}
