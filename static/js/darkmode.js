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

    // This is needed because without the setTimeout() call, the change below takes effect
    // immediately, even on the transition on the initial page load, which is not desirable.
    //
    // One might think that this is exactly what requestAnimationFrame() is for, but alas, that only
    // works about 90% of the time (on Chrome 99)
    setTimeout(() => {
	document.documentElement.style.setProperty("--color-scheme-transition-time", ".4s");
    }, 50);
}

function toggleDarkMode() {
    document.body.classList.toggle("light");
    let isDark = !document.body.classList.contains("light");

    localStorage.setItem("color-scheme", isDark ? "dark" : "light");
}

// Doing this in an onload handler would let the initial color appear for a
// split second.
initDarkMode();
