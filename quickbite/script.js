/* =========================================================
   QUICKBITE - JAVASCRIPT
   ========================================================= */

/* ---------- CART ---------- */

let cart = JSON.parse(localStorage.getItem("quickbiteCart")) || [];


/* ---------- PAGE START ---------- */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    setupCursorEffect();

    setupTheme();

});


/* =========================================================
   CURSOR FOLLOWING EFFECT
   ========================================================= */

function setupCursorEffect() {

    document.addEventListener("pointermove", (event) => {

        document.documentElement.style.setProperty(
            "--mouse-x",
            `${event.clientX}px`
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            `${event.clientY}px`
        );

    });

}


/* =========================================================
   THEME / DARK MODE
   ========================================================= */

function setupTheme() {

    const savedTheme =
        localStorage.getItem("quickbiteTheme");

    const themeButton =
        document.getElementById("themeBtn");

    if (savedTheme === "light") {

        document.body.classList.add("light");

        if (themeButton) {
            themeButton.textContent = "☀️";
        }

    }

    if (themeButton) {

        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("light");

            const isLight =
                document.body.classList.contains("light");

            localStorage.setItem(
                "quickbiteTheme",
                isLight ? "light" : "dark"
            );

            themeButton.textContent =
                isLight ? "☀️" : "🌙";

            showToast(
                isLight
                    ? "Light mode enabled"
                    : "Dark mode enabled"
            );

        });

    }

}


/* =========================================================
   SEARCH
   ========================================================= */

function searchFood() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    const value =
        input.value.trim();

    if (value === "") {

        showToast(
            "Please enter a food or restaurant name"
        );

        input.focus();

        return;
    }

    showToast(
        `Searching for "${value}"...`
    );

    setTimeout(() => {

        window.location.href =
            `restaurants.html?search=${encodeURIComponent(value)}`;

    }, 700);

}


/* Allow Enter key inside search box */

const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {
                searchFood();
            }

        }
    );

}


/* =========================================================
   CATEGORY SELECTION
   ========================================================= */

function selectCategory(category) {

    showToast(
        `${category} restaurants selected`
    );

    setTimeout(() => {

        window.location.href =
            `restaurants.html?category=${encodeURIComponent(category)}`;

    }, 500);

}


/* =========================================================
   FAVORITES
   ========================================================= */

function toggleFavorite(button) {

    button.classList.toggle("favorited");

    if (button.classList.contains("favorited")) {

        button.textContent = "♥";

        showToast("Added to favorites ❤️");

    } else {

        button.textContent = "♡";

        showToast("Removed from favorites");

    }

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(name, price) {

    const existingItem =
        cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    showToast(
        `${name} added to cart 🛒`
    );

}


/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart() {

    localStorage.setItem(
        "quickbiteCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent =
        totalItems;

}


/* =========================================================
   LOGIN MODAL
   ========================================================= */

function showLogin() {

    const modal =
        document.getElementById("loginModal");

    if (!modal) return;

    modal.classList.add("show");

}


function closeModal() {

    const modal =
        document.getElementById("loginModal");

    if (!modal) return;

    modal.classList.remove("show");

}


function loginUser() {

    const email =
        document.getElementById("loginEmail");

    if (!email) return;

    const value =
        email.value.trim();

    if (value === "") {

        showToast(
            "Please enter your email"
        );

        email.focus();

        return;
    }

    if (!value.includes("@")) {

        showToast(
            "Please enter a valid email"
        );

        email.focus();

        return;
    }

    closeModal();

    showToast(
        `Welcome to QuickBite! 👋`
    );

}


/* Close modal when clicking outside */

const loginModal =
    document.getElementById("loginModal");

if (loginModal) {

    loginModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === loginModal
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   OFFERS
   ========================================================= */

function showOffers() {

    showToast(
        "Use QUICK150 to get ₹150 OFF 🎁"
    );

}


/* =========================================================
   COPY COUPON
   ========================================================= */

function copyCoupon() {

    const coupon =
        "QUICK150";

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard.writeText(coupon)
            .then(() => {

                showToast(
                    "Coupon QUICK150 copied! 🎉"
                );

            })
            .catch(() => {

                showToast(
                    "Coupon: QUICK150"
                );

            });

    } else {

        showToast(
            "Coupon: QUICK150"
        );

    }

}


/* =========================================================
   TOAST NOTIFICATION
   ========================================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    if (!toast || !toastMessage) return;

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}


/* =========================================================
   KEYBOARD SHORTCUT
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /* Press "/" to focus search */

        if (
            event.key === "/" &&
            document.activeElement.tagName !== "INPUT"
        ) {

            event.preventDefault();

            const search =
                document.getElementById(
                    "searchInput"
                );

            if (search) {
                search.focus();
            }

        }

        /* Press Escape to close modal */

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


/* =========================================================
   CARD TILT EFFECT
   ========================================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        const cards =
            document.querySelectorAll(
                ".restaurant-card"
            );

        cards.forEach(card => {

            const rect =
                card.getBoundingClientRect();

            const inside =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;

            if (!inside) return;

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

    }
);


/* Reset card position */

document.addEventListener(
    "mouseleave",
    () => {

        document
            .querySelectorAll(".restaurant-card")
            .forEach(card => {

                card.style.transform = "";

            });

    }
);