const url = window.location.href;

async function apiReadTasks() {
    return await (await makeApiRequest({ action: "read" })).json();
}

async function apiCreateTask(task) {
    return await makeApiRequest({
        action: "create",
        data: {
            id: task.id,
            description: task.description
        }
    });
}

async function apiUpdateTask(task) {
    return await makeApiRequest({
        action: "update",
        data:  task
    });
}

async function apiDeleteTask(taskId) {
    return await makeApiRequest({
        action: "delete",
        data: { id: taskId }
    });
}

async function makeApiRequest(content) {
    return await fetch(window.location.href, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
    });
}