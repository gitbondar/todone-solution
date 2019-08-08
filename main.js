// let todos = [
//   `Be able to mark todos "done".`,
//   `Allow user interaction through the DOM`,
//   `Add dates to todos.`,
// ]

// let completed = [
//   false,
//   false,
//   false,
// ]

// let dates = [
//   getCurrentDateAndTime(),
//   getCurrentDateAndTime(),
//   getCurrentDateAndTime(),
// ]

function getCurrentDateAndTime() {
  return new Date().toLocaleString();
}


// Or the ALTERNATE method:
let todos = [
  [
    `Be able to mark todos "done".`,
    false,
    getCurrentDateAndTime(),
  ],
  [
    `Allow user interaction through the DOM`,
    false,
    getCurrentDateAndTime(),
  ],
  [
    `Add dates to todos.`,
    false,
    getCurrentDateAndTime(),
  ],
]

// TODO: uncomment below once you have printList and printTodo working!
printList();


function printTodo(todoName, todoDate, todoIndex) {
  const ol = document.querySelector('.todo-list');
  
  const li = document.createElement('li');
  li.id = todoIndex;
  
  const todoNameItem = document.createElement('p');
  const todoDateItem = document.createElement('p');
  todoNameItem.innerText = todoName;
  todoDateItem.innerText = todoDate;
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
    printTodo(todos[i][0], todos[i][2], i);

    i = i + 1;
  }
}

function addTodo(todo, todoDate) {
  // todos.push(todo);
  // completed.push(false);
  // dates.push(getCurrentDateAndTime());

  // Or, using tuples:
    todos.push([todo, false, todoDate]);
}

// A function that removes an item at a given index from our todo list.
function removeTodo(i) {
  todos.splice(i, 1);

  // Unneeded (and an error!) if using tuples:
  // completed.splice(i, 1);
  // dates.splice(i, 1);
}


const addButton = document.querySelector('.add-todo');
addButton.onclick = addToList;

function addToList() {
  const inputBox = document.querySelector('.todo-input');
  const userInput = inputBox.value;
  const todoDate = getCurrentDateAndTime();
  addTodo(userInput, todoDate);
  printTodo(userInput, todoDate, todos.length);
  inputBox.value = '';
}


function handleMark(event) {
  // Get the li
  const li = event.target.parentNode;

  // Get the li's index.
  const ul = document.querySelector('.todo-list');
  const listItems = Array.from(ul.childNodes);
  const index = listItems.indexOf(li);

  // Alternate method to getting the index:
  // const index = Number(li.id);


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
  if (todos[index][1] === true) {
    todos[index][1] = false;
  } else {
    todos[index][1] = true;
  }
}

function printMark(index) {
  const li = document.querySelector(`li:nth-child(${index + 1})`);
  // if (completed[index] === true) {
  //   li.style.textDecoration = '';
  // } else {
  //   li.style.textDecoration = 'line-through';
  // }

  // Or, for tuples:
  if (todos[index][1] === true) {
    li.style.textDecoration = '';
  } else {
    li.style.textDecoration = 'line-through';
  }
}

const deleteButton = document.querySelector('.delete-completed-todos');
deleteButton.onclick = handleDelete;

function handleDelete() {
  const newTodos = [];
  // The next two lines are unnecessary for tuples:
  // const newCompleted = [];
  // const newDates = [];

  for (let i = 0; i < todos.length; i++) {
    // if (completed[i] === false) {
    //   newTodos.push(todos[i]);
    //   newCompleted.push(false);
    //   newDates.push(dates[i]);
    // }

    // Alternate if statement for tuples:
    if (todos[i][1] === false) {
      newTodos.push(todos[i]);
    }
    
  }

  todos = newTodos;

  // Unnecessary for tuples:
  completed = newCompleted;
  dates = newDates;

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
