window.addEventListener("pageshow", () => {
    const input = document.querySelector("input[type=text]")
    const button = document.querySelector("input[type=button]")
    const updateButtonState = () => button.disabled = input.value.trim() === "";

    input.addEventListener("input", updateButtonState);
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") button.click();
    });

    updateButtonState();
});