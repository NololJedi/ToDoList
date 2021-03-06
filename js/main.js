'use strict';

/* SVG icons. */
let removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"></rect><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"></path></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"></path></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"></path></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"></path></g></g></g></svg>';
let completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"></rect><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"></path></g></svg>';

/* Global variables. */
let addButton = document.getElementById('add');
let item = document.getElementById('item');
let listOfUncompletedTasks = document.getElementById('todo');
let data = {
    todo : [],
    completed : []
};

/* Render task in desktop. */
function render() {
    console.log(data)
}

/* Delete task from list. */
function deleteTask() {
    let task = this.parentNode.parentNode;
    let list = task.parentNode;
    let id = list.id;
    let value = task.innerText;

    if (id === 'todo'){
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }

    render();
    list.removeChild(task);
}

/* Mark task as completed in list. */
function completeTask() {
    let task = this.parentNode.parentNode;
    let list = task.parentNode;
    let listId = list.id;
    let value = task.innerText;

    if (listId === 'todo'){
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }

    let target = (listId === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
    list.removeChild(task);
    target.insertBefore(task, target.childNodes[0]);

    render();
}

/* Creates new task in list. */
function createTask(task){
    let itemTask = document.createElement('li');
    itemTask.innerText = task;

    let buttons = initializeButtons();
    itemTask.appendChild(buttons);

    listOfUncompletedTasks.insertBefore(itemTask, listOfUncompletedTasks.childNodes[0]);
    render();
}

addButton.addEventListener('click', function () {
    let task = item.value;
    if (task){
        data.todo.push(task);
        createTask(task);
        item.value = '';
    }
});

/* Initialize buttons. */
function initializeDeleteTaskButton() {
    let removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.innerHTML = removeSVG;
    removeButton.addEventListener('click', deleteTask);

    return removeButton;
}

function initializeCompleteTaskButton() {
    let completeButton = document.createElement('button');
    completeButton.classList.add('complete');
    completeButton.innerHTML = completeSVG;
    completeButton.addEventListener('click', completeTask);

    return completeButton;
}

function initializeButtons() {
    let buttons = document.createElement('div');
    buttons.classList.add('buttons');
    let removeButton = initializeDeleteTaskButton();
    buttons.appendChild(removeButton);
    let completeButton = initializeCompleteTaskButton();
    buttons.appendChild(completeButton);

    return buttons;
}
