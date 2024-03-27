const tasktsList = document.querySelector('#tasks-list');
const addNewTaskInput = document.querySelector('#new-task');
const addTaskButton = document.querySelector('#add-task');

const tasks = [];

const app = {
    tasks,
    tasktsList,
    addNewTaskInput,
};

window.onload = function(){
    const savedTasks = JSON.parse(localStorage.getItem('task')) || [];
    app.tasks = savedTasks.map((task) => {
        return createTask(task.tittle, task.isCompleated);
    });
    app.tasks.forEach((task) => {
        return addTaskToList(task, app.tasktsList);
    });
}

function saveTasksToLocalStorage(task){
    localStorage.setItem('task',JSON.stringify(task));
}

function createTask(tittle, isCompleated = false) {
    return {
        id: Date.now(),
        tittle,
        isCompleated,
    }
}

function addTaskToList(task, tasktsList) {
    const taskElement = createTaskElement(task);
    tasktsList.appendChild(taskElement);
}

function addTask(app) {    
    const newTaskTittle = app.addNewTaskInput.value;
    if (newTaskTittle.trim() === ''){
        alert('Define un nombre a tu tarea');
        return;
    }
    const newTask = createTask(newTaskTittle);
    app.tasks.push(newTask);

    addTaskToList(newTask, app.tasktsList);
    app.addNewTaskInput.value = '';
    saveTasksToLocalStorage(app.tasks);
}

function createTaskElement(task) {
    const taskElement = document.createElement('li');

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.isCompleated;
    taskCheckbox.addEventListener('change', () => {
        task.isCompleated = taskCheckbox.checked;
        taskText.classList.toggle("completed", task.isCompleated);
        saveTasksToLocalStorage(app.tasks);
    });

    const taskText = document.createElement('span');
    taskText.textContent = task.tittle;
    taskText.classList.toggle("completed", task.isCompleated);

    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.textContent = 'Eliminar tarea';
    taskDeleteButton.className = 'delete-button';
    taskDeleteButton.addEventListener('click', () => {
        taskElement.remove();
        const taskIndex = app.tasks.indexOf(task);
        if (taskIndex > -1){
            app.tasks.splice(taskIndex, 1);
        }
        saveTasksToLocalStorage(app.tasks);
    });

    taskElement.appendChild(taskCheckbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(taskDeleteButton);
    return taskElement;
}

addTaskButton.addEventListener('click', () => {
    addTask(app);
});
addNewTaskInput.addEventListener('keydown', (event) => {
    if(event.key === "Enter"){
        addTask(app);
    }
});