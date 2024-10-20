window.addEventListener("load", async () => {
    const taskList = document.getElementsByClassName("task_list")[0];
    const input = document.querySelector("input[type=text]")
    const button = document.querySelector("input[type=button]")

    button.addEventListener("click", () => {
        createNewTask(taskList, input.value)
        clearInput(input);
    });

    const tasks = await apiReadTasks();
    for (const task of tasks) taskList.innerHTML += taskTemplate(task);
});

function createNewTask(taskList, description) {
    const task = { id: uniqueid(), description, finished: false};
    taskList.innerHTML += taskTemplate(task);
    apiCreateTask(task)
}

function updateTask(button) {
    const description = window.prompt("Nova descrição:")
    if (description.trim() === "") return;

    const taskItem = button.closest("li");
    const finished = taskItem.querySelector("input[type=checkbox]").checked;
    const task = {id: taskItem.id, description, finished};

    taskItem.querySelector("p").innerHTML = description;
    apiUpdateTask(task);
}

function deleteTask(button) {
    if (!window.confirm("Realmente deseja excluir esta tarefa?")) return;

    const taskItem = button.closest("li");
    apiDeleteTask(taskItem.id);
    taskItem.remove();
}

function onCheckboxChange(checkbox) {
    const taskItem = checkbox.closest("li");
    const description = taskItem.querySelector("p").innerHTML;
    const task = {id: taskItem.id, description, finished: checkbox.checked};
    apiUpdateTask(task);
}

function taskTemplate({id, description, finished}) {
    return `<li id=${id} class="task_item">
                <p>${description}</p>
                <input type="button" value="Deletar" class="negative_btn" onclick="deleteTask(this)">
                <input type="button" value="Editar" class="neutro_btn" onclick="updateTask(this)">
                <div><input type="checkbox" ${finished ? "checked" : ""} onchange="onCheckboxChange(this)"></div>
            </li>`;
}

function uniqueid() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function clearInput(inputElement) {
    inputElement.value = "";
    inputElement.dispatchEvent(new Event("input"))
}