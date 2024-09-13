document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(input.value);
        input.value = '';
    });

    list.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            removeTask(e.target.parentElement);
        } else if (e.target.tagName === 'LI') {
            toggleComplete(e.target);
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'X';
        li.appendChild(removeBtn);
        list.appendChild(li);
        saveTasks();
    }

    function removeTask(taskElement) {
        taskElement.remove();
        saveTasks();
    }

    function toggleComplete(taskElement) {
        taskElement.classList.toggle('completed');
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        list.querySelectorAll('li').forEach(taskElement => {
            tasks.push({
                text: taskElement.firstChild.textContent,
                completed: taskElement.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'X';
            li.appendChild(removeBtn);
            list.appendChild(li);
        });
    }

    loadTasks();
});
