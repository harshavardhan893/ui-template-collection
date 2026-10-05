const songs = [
    {
        title: "Midnight Drive",
        artist: "Nova Lane"
    },
    {
        title: "Neon Skies",
        artist: "The Echoes"
    },
    {
        title: "Ocean Lights",
        artist: "Luna Ray"
    },
    {
        title: "City Pulse",
        artist: "Aria Stone"
    },
    {
        title: "Afterglow",
        artist: "Kai Rivers"
    },
    {
        title: "Golden Hour",
        artist: "Maya Bloom"
    },
    {
        title: "Electric Dreams",
        artist: "The Waves"
    },
    {
        title: "Silent Roads",
        artist: "Leo Hart"
    }
];

let currentIndex = 0;
let isPlaying = false;
let progressValue = 0;

let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
let playlist = JSON.parse(localStorage.getItem("soundwavePlaylist")) || [];

const titleElement = document.getElementById("currentTitle");
const artistElement = document.getElementById("currentArtist");
const playButton = document.getElementById("playButton");
const progressElement = document.getElementById("progress");
const currentTimeElement = document.getElementById("currentTime");

function playSong(title, artist) {
    const index = songs.findIndex(song => song.title === title);

    if (index !== -1) {
        currentIndex = index;
    }

    if (titleElement) {
        titleElement.textContent = title;
    }

    if (artistElement) {
        artistElement.textContent = artist;
    }

    isPlaying = true;
    progressValue = 0;

    updatePlayerButton();
    showToast("Playing: " + title);

    localStorage.setItem("currentSong", JSON.stringify({
        title: title,
        artist: artist
    }));
}

function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayerButton();

    if (isPlaying) {
        showToast("Music playing ▶");
    } else {
        showToast("Music paused");
    }
}

function updatePlayerButton() {
    if (playButton) {
        playButton.textContent = isPlaying ? "❚❚" : "▶";
    }

    const pagePlay = document.getElementById("pagePlay");

    if (pagePlay) {
        pagePlay.textContent = isPlaying ? "❚❚" : "▶";
    }
}

function nextSong() {
    currentIndex++;

    if (currentIndex >= songs.length) {
        currentIndex = 0;
    }

    playSong(
        songs[currentIndex].title,
        songs[currentIndex].artist
    );
}

function previousSong() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = songs.length - 1;
    }

    playSong(
        songs[currentIndex].title,
        songs[currentIndex].artist
    );
}

function toggleLike(title, artist) {

    const exists = likedSongs.some(song => song.title === title);

    if (exists) {
        likedSongs = likedSongs.filter(song => song.title !== title);
        showToast("Removed from liked songs");
    } else {
        likedSongs.push({
            title: title,
            artist: artist
        });

        showToast("Added to liked songs ❤️");
    }

    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));

    renderLikedSongs();
}

function addToPlaylist(title, artist) {

    const exists = playlist.some(song => song.title === title);

    if (exists) {
        showToast("Already in your playlist");
        return;
    }

    playlist.push({
        title: title,
        artist: artist
    });

    localStorage.setItem(
        "soundwavePlaylist",
        JSON.stringify(playlist)
    );

    showToast("Added to playlist ✓");

    renderPlaylist();
}

function removeFromPlaylist(title) {

    playlist = playlist.filter(song => song.title !== title);

    localStorage.setItem(
        "soundwavePlaylist",
        JSON.stringify(playlist)
    );

    showToast("Removed from playlist");

    renderPlaylist();
}

function renderPlaylist() {

    const container = document.getElementById("playlistContainer");

    if (!container) {
        return;
    }

    if (playlist.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>Your playlist is empty</h2>
                <p>Add songs from the search page to create your playlist.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = playlist.map((song, index) => `
        <div class="song-row">

            <div class="song-number">
                ${index + 1}
            </div>

            <div class="song-info">
                <strong>${song.title}</strong>
                <span>${song.artist}</span>
            </div>

            <div class="song-actions">
                <button onclick="playSong('${song.title}', '${song.artist}')">
                    ▶
                </button>

                <button onclick="removeFromPlaylist('${song.title}')">
                    ✕
                </button>
            </div>

        </div>
    `).join("");
}

function renderLikedSongs() {

    const container = document.getElementById("likedContainer");

    if (!container) {
        return;
    }

    if (likedSongs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No liked songs yet</h2>
                <p>Like songs from the search page to see them here.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = likedSongs.map((song, index) => `
        <div class="song-row">

            <div class="song-number">
                ${index + 1}
            </div>

            <div class="song-info">
                <strong>${song.title}</strong>
                <span>${song.artist}</span>
            </div>

            <div class="song-actions">
                <button onclick="playSong('${song.title}', '${song.artist}')">
                    ▶
                </button>

                <button onclick="toggleLike('${song.title}', '${song.artist}')">
                    ♥
                </button>
            </div>

        </div>
    `).join("");
}

function searchSongs() {

    const input = document.getElementById("searchInput");

    if (!input) {
        return;
    }

    const query = input.value.toLowerCase().trim();

    const results = songs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
    );

    const container = document.getElementById("searchResults");

    if (!container) {
        return;
    }

    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No songs found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = results.map((song, index) => `
        <div class="song-row">

            <div class="song-number">
                ${index + 1}
            </div>

            <div class="song-info">
                <strong>${song.title}</strong>
                <span>${song.artist}</span>
            </div>

            <div class="song-actions">
                <button onclick="playSong('${song.title}', '${song.artist}')">
                    ▶
                </button>

                <button onclick="toggleLike('${song.title}', '${song.artist}')">
                    ♥
                </button>

                <button onclick="addToPlaylist('${song.title}', '${song.artist}')">
                    +
                </button>
            </div>

        </div>
    `).join("");
}

function toggleTheme() {

    document.body.classList.toggle("light");

    const theme = document.body.classList.contains("light")
        ? "light"
        : "dark";

    localStorage.setItem("soundwaveTheme", theme);
}

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

const volume = document.getElementById("volume");

if (volume) {
    volume.addEventListener("input", function () {
        localStorage.setItem("soundwaveVolume", this.value);
    });
}

document.addEventListener("mousemove", function (event) {

    const glow = document.querySelector(".cursor-glow");

    if (glow) {
        glow.style.left = event.clientX + "px";
        glow.style.top = event.clientY + "px";
    }
});

setInterval(() => {

    if (!isPlaying) {
        return;
    }

    progressValue += 0.5;

    if (progressValue >= 100) {
        progressValue = 0;
        nextSong();
    }

    if (progressElement) {
        progressElement.style.width = progressValue + "%";
    }

    if (currentTimeElement) {

        const totalSeconds = Math.floor(
            progressValue * 225 / 100
        );

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        currentTimeElement.textContent =
            minutes + ":" + String(seconds).padStart(2, "0");
    }

}, 1000);

document.addEventListener("DOMContentLoaded", function () {

    const savedTheme = localStorage.getItem("soundwaveTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
    }

    const savedVolume = localStorage.getItem("soundwaveVolume");

    if (savedVolume && volume) {
        volume.value = savedVolume;
    }

    renderPlaylist();
    renderLikedSongs();

    searchSongs();
});