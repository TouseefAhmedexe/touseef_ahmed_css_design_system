const STORAGE_KEY = "bloomrix.ui.theme";
const THEMES = ["light", "dark"];
const root = document.documentElement;
const systemQuery = window.matchMedia("(prefers-color-scheme: dark)");
const listeners = [];

function readSaved() {
    try {
        const value = window.localStorage.getItem(STORAGE_KEY);

        return THEMES.includes(value) ? value : null;
    } catch (error) {
        return null;
    }
}

let chosen = readSaved();
let persisted = true;

export function getEffectiveTheme() {
    return chosen ?? (systemQuery.matches ? "dark" : "light");
}

function notify() {
    listeners.forEach((callback) => callback(getEffectiveTheme()));
}

export function onThemeChange(callback) {
    listeners.push(callback);
}

export function setTheme(theme) {
    if (!THEMES.includes(theme)) {
        return;
    }

    chosen = theme;
    root.setAttribute("data-theme", theme);

    try {
        window.localStorage.setItem(STORAGE_KEY, theme);
        persisted = true;
    } catch (error) {
        persisted = false;
    }

    notify();
}

export function useSystemTheme() {
    chosen = null;
    persisted = true;
    root.removeAttribute("data-theme");

    try {
        window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        persisted = false;
    }

    notify();
}

function describeSource() {
    if (chosen === null) {
        return "following your device";
    }

    return persisted ? "saved in this browser" : "this page only, because your browser blocked saving";
}

export function initThemeControls() {
    const toggles = document.querySelectorAll("[data-theme-toggle]");
    const systemButtons = document.querySelectorAll("[data-theme-system]");
    const statuses = document.querySelectorAll("[data-theme-status]");

    function render(theme) {
        statuses.forEach((status) => {
            status.textContent = `Theme: ${theme} (${describeSource()})`;
        });

        toggles.forEach((button) => {
            button.textContent = theme === "dark" ? "Switch to light" : "Switch to dark";
        });

        systemButtons.forEach((button) => {
            button.disabled = chosen === null;
        });
    }

    toggles.forEach((button) => {
        button.addEventListener("click", () => setTheme(getEffectiveTheme() === "dark" ? "light" : "dark"));
    });

    systemButtons.forEach((button) => {
        button.addEventListener("click", useSystemTheme);
    });

    systemQuery.addEventListener("change", () => {
        if (chosen === null) {
            notify();
        }
    });

    onThemeChange(render);
    render(getEffectiveTheme());
}