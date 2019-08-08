function getCurrentDateAndTime() {
  return new Date().toLocaleString();
}


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

// TODO: uncomment below once you have printList and printTodo working!
printList();


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

// A function that prints everything on our todo list, INDIVIDUALLY.
// Make SURE to use the above function!
function printList() {
  let i = 0;
  while (i < todos.length) {
    // printTodo(todos[i], dates[i], i);
    // Or, for tuples:
    printTodo(todos[i], i);

    i = i + 1;
  }
}

function addTodo(newTodo) {
  todos.push(newTodo);
}

// A function that removes an item at a given index from our todo list.
function removeTodo(i) {
  todos.splice(i, 1);
}


const addButton = document.querySelector('.add-todo');
addButton.onclick = addToList;

function addToList() {
  const inputBox = document.querySelector('.todo-input');
  const todoName = inputBox.value;
  const todoDate = getCurrentDateAndTime();
  const priorityInput = document.querySelector('.priority-pulldown');
  const todoPriority = Number(priorityInput.value);
  console.log(todoPriority);
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


function handleMark(event) {
  // Get the li
  const li = event.target.parentNode;

  // Get the li's index.
  // const ul = document.querySelector('.todo-list');
  // const listItems = Array.from(ul.childNodes);
  // const index = listItems.indexOf(li);

  // Alternate method to getting the index:
  const index = Number(li.id);


  printMark(index);
  markComplete(index);
}


function markComplete(index) {
  // if (completed[index] === true) {
  //   completed[index] = false;
  // } else {
  //   completed[index] = true;
  // }
  // Or, for tuples:
  if (todos[index].completed === true) {
    todos[index].completed = false;
  } else {
    todos[index].completed = true;
  }
}

function printMark(index) {
  const li = document.querySelector(`li:nth-child(${index + 1})`);
  
  if (todos[index].completed === true) {
    li.style.textDecoration = '';
  } else {
    li.style.textDecoration = 'line-through';
  }
}

const deleteButton = document.querySelector('.delete-completed-todos');
deleteButton.onclick = handleDelete;

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


function clearList() {
  // Grab the todo list ul and put it in a variable
  const list = document.querySelector('.todo-list');

  // Remove all children of that list.
  // My favorite way uses `.hasChildNodes()` and `.remove()` and `.firstChild`, but there are other ways if you wanna research them instead!
  while (list.hasChildNodes()) {
    list.firstChild.remove();
  }
}
