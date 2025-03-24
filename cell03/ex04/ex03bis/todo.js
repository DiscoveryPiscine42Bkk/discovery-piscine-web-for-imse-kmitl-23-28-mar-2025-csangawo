$(document).ready(function() {
    // Load tasks from cookies
    function loadTasks() {
        const tasks = getCookie("tasks");
        if (tasks) {
            const tasksArray = JSON.parse(tasks);
            tasksArray.forEach(task => {
                addTaskToDOM(task);
            });
        }
    }

    // Save tasks to cookies
    function saveTasks() {
        const tasks = [];
        $('#ft_list div').each(function() {
            tasks.push($(this).text());
        });
        setCookie("tasks", JSON.stringify(tasks), 365);
    }

    // Set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Get a cookie
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

    // Add a new task to the DOM
    function addTaskToDOM(task) {
        const taskDiv = $('<div class="task"></div>').text(task);
        $('#ft_list').prepend(taskDiv);

        // Remove task on click
        taskDiv.on('click', function() {
            if (confirm("Do you want to remove this task?")) {
                taskDiv.remove();
                saveTasks(); // Save updated tasks to cookies
            }
        });
    }

    // Event listener for the "New" button
    $('#newButton').on('click', function() {
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
});
