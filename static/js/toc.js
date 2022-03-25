"use strict";

function measureToc() {
    let tocContainer = document.getElementById("tocContainer");
    let tocTitle = document.getElementById("tocTitle");
    let tocCollapsible = document.getElementById("tocCollapsible");

    let oldContainerWidth = tocContainer.style.width;
    let oldCollapsibleWidth = tocCollapsible.style.width;
    let oldCollapsibleHeight = tocCollapsible.style.height;

    // Set relevant elements to automatic sizing.
    // Setting these properties to the empty string is not enough because the stylesheet might have
    // set them already and we need to override that.
    tocContainer.style.width = "fit-content";
    tocCollapsible.style.width = "fit-content";
    tocCollapsible.style.height = "fit-content";

    // Apparently, this call is necessary so that the CSS properties set above take effect.
    requestAnimationFrame(() => {
	// These properties apparently round to the nearest integer but rounding down would make
	// them wrap text differently than when autosizing. Add a pixel because it's better to wrap
	// too little than to wrap too much,
	let titleWidth = tocTitle.offsetWidth + 1;
	let containerWidth = tocContainer.offsetWidth + 1;
	let collapsibleWidth = tocCollapsible.offsetWidth + 1;
	let collapsibleHeight = tocCollapsible.offsetHeight + 1;

	// Make sure the TOC width cannot shrink under that of the title. Sadly,
	// calc() does not have min() / max() operators.
	let clampedCollapsibleWidth = Math.max(collapsibleWidth, titleWidth);

	tocContainer.style.setProperty("--measured-title-width", titleWidth + "px");
	tocContainer.style.setProperty("--measured-expanded-width", clampedCollapsibleWidth + "px");
	tocCollapsible.style.setProperty("--measured-expanded-width", clampedCollapsibleWidth + "px");
	tocCollapsible.style.setProperty("--measured-height", collapsibleHeight + "px");

	tocContainer.style.width = oldContainerWidth;
	tocCollapsible.style.width = oldCollapsibleWidth;
	tocCollapsible.style.height = oldCollapsibleHeight;
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
