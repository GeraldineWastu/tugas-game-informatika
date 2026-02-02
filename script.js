// Menunggu DOM selesai dimuat sebelum menjalankan fungsi
document.addEventListener('DOMContentLoaded', loadTasks);

// Mengambil elemen form dan daftar tugas
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Menambahkan event listener untuk submit form
taskForm.addEventListener('submit', addTask);

// Fungsi untuk menambahkan tugas baru
function addTask(e) {
    e.preventDefault(); // Mencegah reload halaman
    const taskInput = document.getElementById('task-input').value.trim();
    
    if (taskInput === '') return; // Jika input kosong, tidak lakukan apa-apa
    
    // Membuat objek tugas
    const task = {
        id: Date.now(), // ID unik berdasarkan timestamp
        text: taskInput,
        completed: false
    };
    
    // Menyimpan tugas ke localStorage
    saveTask(task);
    // Merender ulang daftar tugas
    renderTasks();
    // Reset form
    taskForm.reset();
}

// Fungsi untuk menyimpan tugas ke localStorage
function saveTask(task) {
    let tasks = getTasks(); // Mengambil tugas yang ada
    tasks.push(task); // Menambahkan tugas baru
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Simpan ke localStorage
}

// Fungsi untuk mengambil tugas dari localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []; // Jika tidak ada, kembalikan array kosong
}

// Fungsi untuk merender daftar tugas
function renderTasks() {
    const tasks = getTasks();
    taskList.innerHTML = ''; // Kosongkan daftar sebelum merender ulang
    
    tasks.forEach(task => {
        // Membuat elemen div untuk setiap tugas
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        if (task.completed) taskDiv.classList.add('completed'); // Tambahkan class jika selesai
        
        // Membuat checkbox untuk menandai selesai
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(task.id));
        
        // Membuat span untuk teks tugas
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        
        // Membuat tombol hapus
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Hapus';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        // Menambahkan elemen ke taskDiv
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(deleteBtn);
        
        // Menambahkan taskDiv ke taskList
        taskList.appendChild(taskDiv);
    });
}

// Fungsi untuk toggle status selesai tugas
function toggleComplete(id) {
    let tasks = getTasks();
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Fungsi untuk menghapus tugas
function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id); // Filter tugas yang tidak dihapus
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Fungsi untuk memuat tugas saat halaman dimuat
function loadTasks() {
    renderTasks();
}