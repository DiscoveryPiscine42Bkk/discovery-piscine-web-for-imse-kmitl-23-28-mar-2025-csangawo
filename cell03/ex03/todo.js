
function loadTasks() {
    const tasks = getCookie("tasks");
    if (tasks) {
        const tasksArray = JSON.parse(tasks);
        tasksArray.forEach(task => {
            addTaskToDOM(task);
        });
    }
}


function saveTasks() {
    const tasks = [];
    const taskDivs = document.querySelectorAll('#ft_list div');
    taskDivs.forEach(taskDiv => {
        tasks.push(taskDiv.textContent);
    });
    setCookie("tasks", JSON.stringify(tasks), 365);
}


function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}


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


function addTaskToDOM(task) {
    const taskDiv = document.createElement('div');
    taskDiv.textContent = task;
    taskDiv.classList.add('task');
    document.getElementById('ft_list').prepend(taskDiv);


    taskDiv.addEventListener('click', function () {
        const confirmRemove = confirm("Do you want to remove this task?");
        if (confirmRemove) {
            taskDiv.remove();
            saveTasks(); 
        }
    });
}


document.getElementById('newButton').addEventListener('click', function () {
    const newTask = prompt("Enter your new task:");
    if (newTask && newTask.trim() !== "") {
        addTaskToDOM(newTask);
        saveTasks(); 
    } else {
        alert("Task cannot be empty!");
    }
});


loadTasks();
