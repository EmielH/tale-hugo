function initDarkMode() {
    let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Apparently if the background color is changed here, the previous
    // color (in the HTML page) doesn't appear even briefly
}

function toggleDarkMode() {
    console.log("toggle");
}

window.addEventListener("load", initDarkMode);
