/**
 * My Arena Global Configuration & Asset Loader
 * Centralizes paths for main domain, subdomains, theme assets, and favicons.
 */

const CONFIG = {
    // Automatically detect base URL and image path
    BASE_URL: window.location.origin + "/landing",
    IMG_PATH: window.location.origin + "/imgs",

    // Theme Colors
    COLORS: {
        NAVY: "#1B263B",
        GOLD_PRIMARY: "#D35400",
        GOLD_GRADIENT: "linear-gradient(135deg, #D35400, #A04000)"
    },

    // Maintenance / Versioning
    IS_MAINTENANCE: false,
    VERSION: "2.0.0-production"
};

/**
 * Automatically updates images, background colors, and favicons
 */
document.addEventListener("DOMContentLoaded", function() {

    // 1️⃣ Auto-load images with data-src
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const fileName = img.getAttribute('data-src');
        img.src = `${CONFIG.IMG_PATH}/${fileName}`;
    });

    // 2️⃣ Apply navy background to elements with class 'navy-bg'
    const navyElements = document.querySelectorAll('.navy-bg');
    navyElements.forEach(el => {
        el.style.backgroundColor = CONFIG.COLORS.NAVY;
    });

    // 3️⃣ Automatically add favicons and apple-touch-icon
    const favicons = [
        { rel: "icon", type: "image/x-icon", file: "favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", file: "favicon-32x32.png" },
        { rel: "apple-touch-icon", sizes: "180x180", file: "apple-touch-icon.png" }
    ];

    favicons.forEach(icon => {
        const link = document.createElement("link");
        link.rel = icon.rel;
        if (icon.type) link.type = icon.type;
        if (icon.sizes) link.sizes = icon.sizes;
        link.href = `${CONFIG.IMG_PATH}/${icon.file}`;
        document.head.appendChild(link);
    });

});

// 4️⃣ Prevent modification of the config object
Object.freeze(CONFIG);
