// Function to load tasks from cookies
function loadTasks() {
    const tasks = getCookie("tasks");
    if (tasks) {
        const tasksArray = JSON.parse(tasks);
        tasksArray.forEach(task => {
            addTaskToDOM(task);
        });
    }
}

// Function to save tasks to cookies
function saveTasks() {
    const tasks = [];
    const taskDivs = document.querySelectorAll('#ft_list div');
    taskDivs.forEach(taskDiv => {
        tasks.push(taskDiv.textContent);
    });
    setCookie("tasks", JSON.stringify(tasks), 365);
}

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookies = decodedCookies.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(name + "=") === 0) {
            return c.substring(name.length + 1, c.length);
        }
    }
    return "";
}

// Function to add a new task to the DOM
function addTaskToDOM(task) {
    const taskDiv = document.createElement('div');
    taskDiv.textContent = task;
    taskDiv.classList.add('task');
    document.getElementById('ft_list').prepend(taskDiv);

    // Add event listener to remove task on click
    taskDiv.addEventListener('click', function () {
        const confirmRemove = confirm("Do you want to remove this task?");
        if (confirmRemove) {
            taskDiv.remove();
            saveTasks(); // Save updated tasks to cookies
        }
    });
}

// Event listener for the "New" button
document.getElementById('newButton').addEventListener('click', function () {
    const newTask = prompt("Enter your new task:");
    if (newTask && newTask.trim() !== "") {
        addTaskToDOM(newTask);
        saveTasks(); // Save the new task to cookies
    } else {
        alert("Task cannot be empty!");
    }
});

// Load tasks when the page is loaded
loadTasks();
