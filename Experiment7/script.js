const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const emptyMessage = document.getElementById("emptyMessage");

let currentFilter = "all";


// Add a new task
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


function addTask() {

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("task");

    li.innerHTML = `
        <div class="task-left">
            <input type="checkbox" class="task-check">
            <span class="task-text">${taskName}</span>
        </div>

        <div class="task-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    updateTaskCount();
    updateEmptyMessage();
}


// Event delegation for task actions
taskList.addEventListener("click", function(event) {

    const task = event.target.closest(".task");

    if (!task) {
        return;
    }


    // Delete task
    if (event.target.classList.contains("delete-btn")) {

        task.remove();

        updateTaskCount();
        updateEmptyMessage();
    }


    // Edit task
    if (event.target.classList.contains("edit-btn")) {

        const taskText = task.querySelector(".task-text");

        const newText = prompt(
            "Edit your task:",
            taskText.textContent
        );

        if (newText !== null && newText.trim() !== "") {
            taskText.textContent = newText.trim();
        }
    }
});


// Mark task as completed
taskList.addEventListener("change", function(event) {

    if (event.target.classList.contains("task-check")) {

        const task = event.target.parentElement.parentElement;

        task.classList.toggle(
            "completed",
            event.target.checked
        );

        updateTaskCount();
        applyFilter();
    }
});


// Update task counters
function updateTaskCount() {

    const tasks = taskList.children;

    let completed = 0;

    for (let task of tasks) {

        const checkbox =
            task.querySelector(".task-check");

        if (checkbox.checked) {
            completed++;
        }
    }

    const total = tasks.length;
    const pending = total - completed;

    totalTasks.textContent = `Total: ${total}`;
    pendingTasks.textContent = `Pending: ${pending}`;
    completedTasks.textContent = `Completed: ${completed}`;
}


// Empty message
function updateEmptyMessage() {

    if (taskList.children.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}


// Filter buttons
document.querySelectorAll(".filter").forEach(function(button) {

    button.addEventListener("click", function() {

        document
            .querySelectorAll(".filter")
            .forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        applyFilter();
    });
});


// Apply task filter
function applyFilter() {

    const tasks = taskList.children;

    for (let task of tasks) {

        const checkbox =
            task.querySelector(".task-check");

        if (
            currentFilter === "all" ||
            (currentFilter === "completed" && checkbox.checked) ||
            (currentFilter === "pending" && !checkbox.checked)
        ) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    }
}