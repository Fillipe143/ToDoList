window.addEventListener("load", () => {
    const input = document.querySelector("input[type=text]")
    const button = document.querySelector("input[type=button]")

    button.addEventListener("click", () => {
        window.location.href = encodeURI(input.value);
    });
});

window.addEventListener("pageshow", () => loadLastProjects());
function loadLastProjects() {
    const lastProjectsList = document.getElementsByClassName("latests")[0];
    const lastProjects = JSON.parse(localStorage.getItem("lastProjects")) || [];

    lastProjectsList.innerHTML = lastProjects.reduce((html, name) => html + projectTemplate(name), "");
}

function projectTemplate(name) {
    return `<a href="/${name}">${decodeURIComponent(name)}</a>`;
}