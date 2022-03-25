"use strict";

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
	// When this is executed in the <HEAD> element, the specified
	// transition apparently does not take effect.
	document.documentElement.classList.toggle("light");
    }
}

function toggleDarkMode() {
    document.documentElement.classList.toggle("light");
    let isDark = !document.documentElement.classList.contains("light");

    localStorage.setItem("color-scheme", isDark ? "dark" : "light");
}

// Doing this in an onload handler would let the initial color appear for a
// split second.
initDarkMode();
