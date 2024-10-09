document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const tarea = document.getElementById('tarea');
    const taskText = tarea.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        tarea.value = '';  // Limpiar el campo de texto
    } else {
        alert('Por favor, ingresa una tarea.');
    }
});

function addTask(taskText) {
    const lista = document.getElementById('lista');

    const li = document.createElement('li');
    li.textContent = taskText;

    // Crear botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
        lista.removeChild(li);
    });

    li.appendChild(deleteButton);
    lista.appendChild(li);
}

// eliminar tareas
document.addEventListener('DOMContentLoaded', loadTasks);

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#lista li').forEach(function(task) {
        tasks.push({
            text: task.firstChild.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(function(task) {
        addTask(task.text, task.completed);
    });
}

function addTask(taskText, completed = false) {
    const lista = document.getElementById('lista');
    const li = document.createElement('li');
    li.textContent = taskText;

    if (completed) {
        li.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
        lista.removeChild(li);
        saveTasks();
    });

    li.appendChild(deleteButton);
    lista.appendChild(li);

    saveTasks();
}

// tareas completadas
document.getElementById('lista').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('completed');
        saveTasks();
    }
});
