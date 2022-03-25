function initDarkMode() {
    let storedScheme = localStorage.getItem("color-scheme");
    let isDark;

    if (storedScheme === "dark") {
	isDark = true;
    } else if (storedScheme === "light") {
	isDark = false;
    } else {
	isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    if (!isDark) {
	toggleDarkMode();
    }

    // This is needed because without the requestAnimationFrame() call, the change below takes
    // effect immediately, even on the transition on the initial page load, which is not
    // desirable.
    requestAnimationFrame(() => {
	document.documentElement.style.setProperty("--color-scheme-transition-time", ".4s");
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("light");
    let isDark = !document.body.classList.contains("light");

    localStorage.setItem("color-scheme", isDark ? "dark" : "light");
}

// Doing this in an onload handler would let the initial color appear for a
// split second.
initDarkMode();
