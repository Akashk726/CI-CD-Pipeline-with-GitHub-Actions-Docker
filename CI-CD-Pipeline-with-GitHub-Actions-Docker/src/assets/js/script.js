document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    saveTask(task);
    renderTask(task);
    taskInput.value = '';
}

function renderTask(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = `list-group-item task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
        <span>${task.text}</span>
        <div>
            <button class="btn btn-sm btn-success me-2" onclick="toggleTask(${task.id})">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="btn btn-sm btn-warning me-2" onclick="editTask(${task.id})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}

function toggleTask(id) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

function editTask(id) {
    const taskItem = document.querySelector(`.task-item[data-id="${id}"]`);
    const taskText = taskItem.querySelector('span').textContent;
    taskItem.innerHTML = `
        <input type="text" class="form-control edit-input" value="${taskText}">
        <div>
            <button class="btn btn-sm btn-primary me-2" onclick="saveEdit(${task.id})">Save</button>
            <button class="btn btn-sm btn-secondary" onclick="refreshTaskList()">Cancel</button>
        </div>
    `;
}

function saveEdit(id) {
    const taskItem = document.querySelector(`.task-item[data-id="${id}"]`);
    const newText = taskItem.querySelector('.edit-input').value.trim();

    if (newText === '') {
        alert('Task cannot be empty!');
        return;
    }

    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.text = newText;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

function refreshTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    loadTasks();
}
