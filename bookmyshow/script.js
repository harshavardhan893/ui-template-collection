// ===============================
// CineBook Main JavaScript
// ===============================

document.addEventListener("mousemove", function(e) {
    const cursor = document.querySelector(".cursor-glow");

    if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }
});

function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const light = document.body.classList.contains("light-mode");

    localStorage.setItem("cinebookTheme", light ? "light" : "dark");

    showToast(light ? "Light mode enabled ☀️" : "Dark mode enabled 🌙");
}

if (localStorage.getItem("cinebookTheme") === "light") {
    document.body.classList.add("light-mode");
}

function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function openLogin() {
    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.classList.add("show");
    }
}

function closeLogin() {
    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.classList.remove("show");
    }
}

function loginUser() {
    const name = document.getElementById("loginName").value.trim();
    const email = document.getElementById("loginEmail").value.trim();

    if (!name || !email) {
        showToast("Please enter your name and email.");
        return;
    }

    localStorage.setItem("cinebookUser", JSON.stringify({
        name: name,
        email: email
    }));

    closeLogin();

    showToast("Welcome to CineBook, " + name + "! 🎬");
}

function openMovie(movieName) {
    localStorage.setItem("selectedMovie", movieName);
    window.location.href = "movie.html";
}

document.addEventListener("DOMContentLoaded", function() {

    const cards = document.querySelectorAll(".tilt-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", function(e) {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener("mouseleave", function() {
            card.style.transform = "";
        });

    });

});