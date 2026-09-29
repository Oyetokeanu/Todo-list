let tasks = [];

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");

addTaskButton.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const listItem = document.createElement("li");

        if (task.completed) {
            listItem.classList.add("completed");
        }

        listItem.innerHTML = `
            <input 
                type="checkbox"
                ${task.completed ? "checked" : ""}
            >

            <span class="task-text">${task.text}</span>

            <button class="edit">Edit</button>

            <button class="delete">Delete</button>
        `;

        const checkbox = listItem.querySelector("input");

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            displayTasks();
        });

        const editButton = listItem.querySelector(".edit");

        editButton.addEventListener("click", function() {
            const newText = prompt("Edit your task:", task.text);

            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                displayTasks();
            }
        });

        const deleteButton = listItem.querySelector(".delete");

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            displayTasks();
        });

        taskList.appendChild(listItem);
    });

    updateTaskCount();
}

function updateTaskCount() {
    const remainingTasks = tasks.filter(function(task) {
        return !task.completed;
    }).length;

    taskCount.textContent =
        `${remainingTasks} task${remainingTasks === 1 ? "" : "s"} remaining`;
}

clearCompleted.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    displayTasks();
});