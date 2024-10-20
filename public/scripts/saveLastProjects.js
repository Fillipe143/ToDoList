const lastProjects = JSON.parse(localStorage.getItem("lastProjects")) || [];
const projectName = window.location.href.replace(window.location.origin + "/", "");

if (lastProjects.includes(projectName)) {
    const projectIndex = lastProjects.indexOf(projectName);
    if (projectIndex > 0) {
        const tmpProjectName = lastProjects[projectIndex - 1];
        lastProjects[projectIndex - 1] = lastProjects[projectIndex];
        lastProjects[projectIndex] = tmpProjectName;
    }
} else {
    if (lastProjects.length >= 5) lastProjects.pop();
    lastProjects.push(projectName);
}

localStorage.setItem("lastProjects", JSON.stringify(lastProjects));