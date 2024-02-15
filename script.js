const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let tasks = [];

function addTask() {
    if (!inputBox.value) {
        alert("You must write something");

        return;
    }

    renderListItem(inputBox.value);

    tasks.push({
        text: inputBox.value,
        checked: false
    });

    inputBox.value = '';

    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTaskByText(text) {
    return tasks.find((task) => task.text === text);
}

function getTaskIdByText(text) {
    return tasks.findIndex((task) => task.text === text);
}

function renderListItem(text, checked = false) {
    const el = document.createElement("li");
    el.textContent = text;
    el.classList.toggle("checked", checked);

    el.addEventListener("click", function (event) {
        const task = getTaskByText(event.target.textContent)

        event.target.classList.toggle("checked", !task.checked);
        task.checked = !task.checked;

        updateLocalStorage();
    })

    const crossEl = document.createElement("span");

    crossEl.addEventListener("click", function (event) {
        event.stopPropagation();

        const parent = event.target.parentElement;
        const taskId = getTaskIdByText(parent.textContent)

        tasks.splice(taskId, 1);
        parent.remove();

        updateLocalStorage();
    })

    listContainer.appendChild(el);
    el.appendChild(crossEl);
}

function rerender() {
    for (const task of tasks) {
        renderListItem(task.text, task.checked);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    try {
        tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

        rerender();
    } catch {
        localStorage.removeItem('tasks');

        console.error('NEVALIDNIY JSON PIDARAS')
    }
});
