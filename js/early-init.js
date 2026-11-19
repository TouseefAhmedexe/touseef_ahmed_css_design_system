function applySavedTheme() {
    let theme = null;

    try {
        theme = window.localStorage.getItem("bloomrix.ui.theme");
    } catch (error) {
        theme = null;
    }

    if (theme === "light" || theme === "dark") {
        document.documentElement.setAttribute("data-theme", theme);
    }
}

applySavedTheme();