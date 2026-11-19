import { initThemeControls, onThemeChange } from "./theme.js";

const LOADING_MS = 2000;

initThemeControls();

function showTokenValues() {
    const styles = window.getComputedStyle(document.documentElement);

    document.querySelectorAll("[data-token]").forEach((element) => {
        const value = styles.getPropertyValue(element.dataset.token).trim();

        element.textContent = value === "" ? "not set" : value;
    });
}

function setupModals() {
    document.querySelectorAll("[data-modal-open]").forEach((button) => {
        button.addEventListener("click", () => {
            const dialog = document.getElementById(button.dataset.modalOpen);

            if (dialog !== null) {
                dialog.showModal();
            }
        });
    });

    document.querySelectorAll("dialog.modal").forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    });
}

function setupLoadingDemo() {
    document.querySelectorAll("[data-loading-demo]").forEach((button) => {
        button.addEventListener("click", () => {
            if (button.classList.contains("btn--loading")) {
                return;
            }

            button.classList.add("btn--loading");
            button.setAttribute("aria-busy", "true");

            window.setTimeout(() => {
                button.classList.remove("btn--loading");
                button.removeAttribute("aria-busy");
            }, LOADING_MS);
        });
    });
}

function setupValidationDemo() {
    document.querySelectorAll("[data-validate]").forEach((control) => {
        const field = control.closest(".field");

        if (field === null) {
            return;
        }

        control.addEventListener("input", () => {
            const hasValue = control.value !== "";

            field.classList.toggle("field--error", hasValue && !control.validity.valid);
            field.classList.toggle("field--success", hasValue && control.validity.valid);
        });
    });
}

function setupPlayground() {
    const input = document.getElementById("playground-color");
    const resetButton = document.getElementById("playground-reset");

    if (input === null || resetButton === null) {
        return;
    }

    function syncInput() {
        const value = window.getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim();

        if (value.startsWith("#") && value.length === 7) {
            input.value = value;
        }
    }

    input.addEventListener("input", () => {
        document.documentElement.style.setProperty("--color-primary", input.value);
        showTokenValues();
    });

    resetButton.addEventListener("click", () => {
        document.documentElement.style.removeProperty("--color-primary");
        syncInput();
        showTokenValues();
    });

    onThemeChange(syncInput);
    syncInput();
}

onThemeChange(showTokenValues);
showTokenValues();
setupModals();
setupLoadingDemo();
setupValidationDemo();
setupPlayground();