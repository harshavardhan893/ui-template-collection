document.addEventListener("mousemove", function(e) {
    const cursor = document.querySelector(".cursor-glow");

    if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }
});

function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 2500);
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const mode =
        document.body.classList.contains("light-mode")
        ? "light"
        : "dark";

    localStorage.setItem("streamflixTheme", mode);

    showToast(
        mode === "light"
        ? "Light mode enabled ☀️"
        : "Dark mode enabled 🌙"
    );
}

if (localStorage.getItem("streamflixTheme") === "light") {
    document.body.classList.add("light-mode");
}

function watchMovie(movie) {

    localStorage.setItem("selectedShow", movie);

    window.location.href = "watch.html";
}

function showInfo(movie) {

    localStorage.setItem("selectedShow", movie);

    window.location.href = "watch.html";
}

function addToList(movie) {

    let list =
        JSON.parse(localStorage.getItem("streamflixList")) || [];

    if (!list.includes(movie)) {

        list.push(movie);

        localStorage.setItem(
            "streamflixList",
            JSON.stringify(list)
        );

        showToast(movie + " added to My List ❤️");

    } else {

        showToast(movie + " is already in My List.");
    }
}

function removeFromList(movie) {

    let list =
        JSON.parse(localStorage.getItem("streamflixList")) || [];

    list = list.filter(function(item) {
        return item !== movie;
    });

    localStorage.setItem(
        "streamflixList",
        JSON.stringify(list)
    );

    showToast(movie + " removed.");

    setTimeout(function() {
        location.reload();
    }, 700);
}

function openProfile() {

    const modal =
        document.getElementById("profileModal");

    if (modal) {
        modal.classList.add("show");
    }
}

function closeProfile() {

    const modal =
        document.getElementById("profileModal");

    if (modal) {
        modal.classList.remove("show");
    }
}