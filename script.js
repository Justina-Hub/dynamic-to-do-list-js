document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    loadTasks();

    // ✅ Define addTask function
    function addTask() {
        const taskText = taskInput.value.trim(); // ✅ get & trim value

        if (taskText === '') {
            alert('Please enter a task.'); // ✅ show alert if empty
            return;
        }

        // ✅ Create task element
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add = 'remove-btn';

        // ✅ Remove task from DOM & storage
        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = ''; // ✅ clear input

        // ✅ Save task to localStorage
        saveTaskToStorage(taskText);
    }

    // ✅ Event listener for Add Task button
    addButton.addEventListener('click', addTask);

    // ✅ Event listener for Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // ✅ Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(function (taskText) {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';

            removeButton.onclick = function () {
                taskList.removeChild(li);
                removeTaskFromStorage(taskText);
            };

            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    }

    // ✅ Save task to localStorage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // ✅ Remove task from localStorage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(function (task) {
            return task !== taskText;
        });
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});