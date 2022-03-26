"use strict";

const LOCALSTORAGE_KEY = "color-scheme";
const LIGHT_CLASS = "light";
let mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// true means "dark scheme", false means "light scheme". Ugly, bit simple.
function storedToBool(s) {
    if (s === "dark") {
	return true;
    } else if (s === "light") {
	return false;
    } else {
	return null;
    }
}

function ensureScheme(desiredScheme) {
    let osScheme = mediaQuery.matches;

    // Only store the preference if it's not the same as the OS one.
    if (desiredScheme === osScheme) {
	localStorage.removeItem(LOCALSTORAGE_KEY);
    } else {
	localStorage.setItem(LOCALSTORAGE_KEY, desiredScheme ? "dark" : "light");
    }

    if (desiredScheme) {
	document.documentElement.classList.remove(LIGHT_CLASS);
    } else {
	document.documentElement.classList.add(LIGHT_CLASS);
    }
}

function initDarkMode() {
    let storedScheme = storedToBool(localStorage.getItem(LOCALSTORAGE_KEY));
    let osScheme = mediaQuery.matches;

    // When the class of the document element is changed from a script running in the <HEAD>
    // element, no CSS transition defined on the changed properties takes place.
    ensureScheme(storedScheme === null ? osScheme : storedScheme);
    mediaQuery.addEventListener("change", osDarkModeChanged);
}

function osDarkModeChanged(query) {
    let osScheme = query.matches;
    let pageScheme = !document.documentElement.classList.contains(LIGHT_CLASS);

    // If the current preference is the same as that of the OS, we assume that the user also wants
    // to change the color scheme of the web page. If not, we assume that they consciously overrode
    // the OS and we don't change anything.
    if (pageScheme != osScheme) {
	ensureScheme(!pageScheme);
    }
}

function toggleDarkMode() {
    // The easiest is to decide based on the current color scheme.
    let currentScheme = !document.documentElement.classList.contains(LIGHT_CLASS);
    ensureScheme(!currentScheme);
}

// Doing this in an onload handler would let the initial color appear for a
// split second.
initDarkMode();
