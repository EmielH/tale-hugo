"use strict";

let oldWidth = -1, oldHeight = -1;

function measureToc() {
    if (window.innerWidth === oldWidth && window.innerHeight === oldHeight) {
	// In addition to being a bit of optimization, this clause somehow prevents triggering a
	// bug in Firefox 98.2.0 on Android that makes the stickiness of the table of contents
	// wonky after scrolling to the bottom, then scrolling up.
	return;
    }

    oldWidth = window.innerWidth;
    oldHeight = window.innerHeight;

    let tocContainer = document.getElementById("tocContainer");
    let tocTitle = document.getElementById("tocTitle");
    let tocCollapsible = document.getElementById("tocCollapsible");

    // Set relevant elements to automatic sizing.
    tocContainer.style.width = "fit-content";
    tocCollapsible.style.width = "fit-content";
    tocCollapsible.style.height = "fit-content";

    // Apparently, this call is necessary so that the CSS properties set above take effect.
    requestAnimationFrame(() => {
	// These properties apparently round to the nearest integer but rounding down would make
	// them wrap text differently than when autosizing. Add a pixel because it's better to wrap
	// too little than to wrap too much,
	let titleWidth = tocTitle.offsetWidth + 1;
	let collapsibleWidth = tocCollapsible.offsetWidth + 1;
	let collapsibleHeight = tocCollapsible.offsetHeight + 1;

	// Make sure the TOC width cannot shrink under that of the title. Sadly,
	// calc() does not have min() / max() operators.
	let clampedCollapsibleWidth = Math.max(collapsibleWidth, titleWidth);

	tocContainer.style.setProperty("--measured-title-width", titleWidth + "px");
	tocContainer.style.setProperty("--measured-expanded-width", clampedCollapsibleWidth + "px");
	tocCollapsible.style.setProperty("--measured-expanded-width", clampedCollapsibleWidth + "px");
	tocCollapsible.style.setProperty("--measured-height", collapsibleHeight + "px");

	tocContainer.style.removeProperty("width");
	tocCollapsible.style.removeProperty("width");
	tocCollapsible.style.removeProperty("height");
    });
}

let resizeTimeout = null;

function measureTocAfterResize() {
    // Chrome sometimes does not finish layout when the resize event handler is called, so wait a
    // bit before recalculating sizes. This does not usually result in weird visual effects because
    // it's really hard to resize a window while hovering over the table of contents so we can
    // assume that it's closed when the measurement is running.
    if (resizeTimeout != null) {
	clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(measureToc, 200);
}

window.addEventListener("load", measureToc);
window.addEventListener("resize", measureTocAfterResize);
