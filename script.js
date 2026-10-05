// Open application
function openApp(appName) {

    const apps = {
        quickbite: "quickbite/index.html",
        bookmyshow: "bookmyshow/index.html",
        netflix: "netflix/index.html",
        soundwave: "soundwave/index.html"
    };

    if (apps[appName]) {
        window.location.href = apps[appName];
    }
}


// Theme
function toggleTheme() {

    document.body.classList.toggle("light");

    const button = document.getElementById("themeBtn");

    if (document.body.classList.contains("light")) {
        button.textContent = "☀️";
        localStorage.setItem("mainTheme", "light");
    } else {
        button.textContent = "🌙";
        localStorage.setItem("mainTheme", "dark");
    }
}


// Load saved theme
window.addEventListener("DOMContentLoaded", () => {

    const savedTheme = localStorage.getItem("mainTheme");

    const button = document.getElementById("themeBtn");

    if (savedTheme === "light") {
        document.body.classList.add("light");
        button.textContent = "☀️";
    }

});


// Cursor glow
document.addEventListener("mousemove", (event) => {

    const glow = document.querySelector(".cursor-glow");

    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";

});


// Keyboard shortcuts
document.addEventListener("keydown", (event) => {

    if (event.key === "1") {
        openApp("quickbite");
    }

    if (event.key === "2") {
        openApp("bookmyshow");
    }

    if (event.key === "3") {
        openApp("netflix");
    }

    if (event.key === "4") {
        openApp("soundwave");
    }

});