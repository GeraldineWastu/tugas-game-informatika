document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input').value;
    const deadlineInput = document.getElementById('deadline-input').value;
    const dayInput = document.getElementById('day-input').value;

    const task = {
        id: Date.now(),
        task: taskInput,
        deadline: deadlineInput,
        day: dayInput,
        completed: false
    };

    saveTask(task);
    renderTasks();
    taskForm.reset();
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function renderTasks() {
    const tasks = getTasks();
    taskList.innerHTML = '';

    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    days.forEach(day => {
        const dayTasks = tasks.filter(t => t.day === day);
        if (dayTasks.length > 0) {
            const dayHeader = document.createElement('h2');
            dayHeader.textContent = day;
            taskList.appendChild(dayHeader);

            dayTasks.forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.className = 'task';
                if (task.completed) taskDiv.classList.add('completed');

                taskDiv.innerHTML = `
                    <div class="task-info">
                        <strong>${task.task}</strong> - Deadline: ${task.deadline}
                    </div>
                    <div class="task-actions">
                        <button class="complete-btn" onclick="toggleComplete(${task.id})">${task.completed ? 'Batal' : 'Selesai'}</button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Hapus</button>
                    </div>
                `;
                taskList.appendChild(taskDiv);
            });
        }
    });
}

function toggleComplete(id) {
    let tasks = getTasks();
    tasks = tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function loadTasks() {
    renderTasks();
}