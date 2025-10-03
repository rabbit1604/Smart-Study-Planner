const subjectInput = document.getElementById("subject");
const topicInput = document.getElementById("topic");
const durationInput = document.getElementById("duration");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => addTaskToDOM(task));

addTaskBtn.addEventListener("click", () => {
    const subject = subjectInput.value.trim();
    const topic = topicInput.value.trim();
    const duration = parseFloat(durationInput.value);

    if (!subject || !topic || !duration) return alert("Please fill all fields");

    const task = {
        id: Date.now(),
        subject,
        topic,
        duration,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskToDOM(task);

    subjectInput.value = "";
    topicInput.value = "";
    durationInput.value = "";
});

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
        <span>${task.subject} - ${task.topic} (${task.duration} hrs)</span>
        <div>
            <button onclick="toggleComplete(${task.id})">✔</button>
            <button onclick="deleteTask(${task.id})">🗑</button>
        </div>
    `;
    taskList.appendChild(li);
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) task.completed = !task.completed;
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTasks();
}

function refreshTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => addTaskToDOM(task));
}