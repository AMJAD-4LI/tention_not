/**
 * 1st Year Result — Main Application Logic (White Glassmorphism Edition)
 * Handles countdown timer, non-repeating joke carousel, category filters, audio toggles, and tension stats.
 */

// Result Target Date: 22 October 2026, 10:00 AM Pakistan Time (PKT / UTC+5)
const RESULT_TARGET = new Date("2026-10-22T10:00:00+05:00").getTime();

let currentJoke = null;
let jokeAutoInterval = null;
const funnyFaces = ["😰", "😱", "🫣", "💀", "🤲", "👀", "🫀", "😬", "😭", "😮‍💨"];

document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    initJokeSystem();
    initAudioToggle();
    initActionButtons();

    // Testing triggers via URL hash
    if (window.location.hash === '#test-surprise') {
        setTimeout(() => surpriseEngine.triggerDramaticSurprise(), 600);
    }
});

/**
 * 1. Live Countdown Timer & Interactive Face
 */
function initCountdown() {
    function updateCountdown() {
        const remaining = RESULT_TARGET - Date.now();

        if (remaining <= 0) {
            ["days", "hours", "minutes", "seconds"].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = "00";
            });
            const face = document.getElementById("face");
            if (face) face.textContent = "🎉";
            const h2 = document.querySelector(".countdown-heading");
            if (h2) h2.textContent = "TIME'S UP! 🎊";
            const jokeEl = document.getElementById("joke");
            if (jokeEl) jokeEl.textContent = "Dosto! Countdown mukammal ho gaya! Official result check karo. Best of luck! ❤️🤲";
            return;
        }

        const d = Math.floor(remaining / 86400000);
        const h = Math.floor((remaining % 86400000) / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);
        const s = Math.floor((remaining % 60000) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minEl = document.getElementById("minutes");
        const secEl = document.getElementById("seconds");

        if (daysEl) daysEl.textContent = String(d).padStart(2, "0");
        if (hoursEl) hoursEl.textContent = String(h).padStart(2, "0");
        if (minEl) minEl.textContent = String(m).padStart(2, "0");
        if (secEl) secEl.textContent = String(s).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Randomize face emoji on click & update tension
    const faceEl = document.getElementById("face");
    if (faceEl) {
        faceEl.addEventListener("click", () => {
            const nextFace = funnyFaces[Math.floor(Math.random() * funnyFaces.length)];
            faceEl.textContent = nextFace;
            surpriseEngine.shakeScreen(faceEl);
            surpriseEngine.playSfx('pop');
            updateTensionDisplay();
            surpriseEngine.showToast("Heartbeat check: Dhadkan tez ho gayi! 😂", "🫀");
        });
    }
}

function updateTensionDisplay() {
    const tensionEl = document.getElementById("tensionLevel");
    if (tensionEl) {
        tensionEl.textContent = (94 + Math.random() * 5.9).toFixed(1) + "%";
    }
}

/**
 * 2. Joke Display & Carousel System
 */
function initJokeSystem() {
    // Render initial joke
    showNextJoke();

    // Auto rotate every 9 seconds
    resetJokeInterval();

    // Setup Category Filter Pills
    const pills = document.querySelectorAll(".category-pill");
    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            const cat = pill.getAttribute("data-category");
            surpriseEngine.activeCategory = cat;
            surpriseEngine.initDeck();
            showNextJoke();
            resetJokeInterval();
        });
    });
}

function resetJokeInterval() {
    if (jokeAutoInterval) clearInterval(jokeAutoInterval);
    jokeAutoInterval = setInterval(() => {
        showNextJoke(true); // silent auto advance
    }, 9000);
}

function showNextJoke(isAuto = false) {
    currentJoke = surpriseEngine.getNextJoke();
    renderJoke(currentJoke, isAuto);
}

function renderJoke(joke, isAuto = false) {
    const jokeEl = document.getElementById("joke");
    const tagEl = document.getElementById("jokeTag");
    const counterEl = document.getElementById("jokeCounter");

    if (!joke || !jokeEl) return;

    jokeEl.style.opacity = "0";
    setTimeout(() => {
        jokeEl.textContent = joke.text;
        jokeEl.style.opacity = "1";

        if (tagEl) {
            tagEl.textContent = `${joke.emoji || '😂'} ${joke.category}`;
        }
        if (counterEl) {
            counterEl.textContent = `#${joke.id} / ${surpriseEngine.jokes.length}`;
        }
    }, 150);

    if (!isAuto) {
        surpriseEngine.playSfx('pop');
        updateTensionDisplay();
    }
}

function copyCurrentJoke() {
    if (!currentJoke) return;
    surpriseEngine.copyJokeText(encodeURIComponent(currentJoke.text));
}

/**
 * 3. Primary Action Buttons Setup
 */
function initActionButtons() {
    // Dedicated "😂 Result Day Surprise" button
    const dedicatedBtn = document.getElementById("dedicatedSurpriseBtn");
    if (dedicatedBtn) {
        surpriseEngine.attachButtonSurprise(dedicatedBtn, { isDedicated: true });
    }

    // Existing "😂 Tension Kam Karo" button
    const tensionBtn = document.getElementById("tensionKamKaroBtn");
    if (tensionBtn) {
        tensionBtn.addEventListener("click", () => {
            showNextJoke();
            resetJokeInterval();
            surpriseEngine.shakeScreen(tensionBtn);
            surpriseEngine.playSfx('pop');
            surpriseEngine.showToast("Tension kam hui ya Abu ka khauf barh gaya? 🤣", "☕");
        });
    }

    // Existing "😈 Surprise Dekho" button
    const surpriseDekhoBtn = document.getElementById("surpriseDekhoBtn");
    if (surpriseDekhoBtn) {
        surpriseDekhoBtn.addEventListener("click", () => {
            // Trigger dramatic suspense modal
            surpriseEngine.triggerDramaticSurprise(surpriseDekhoBtn);

            // Also reveal the surprise box
            const box = document.getElementById("surprise");
            if (box) {
                box.style.display = "block";
                const surpriseText = document.getElementById("surpriseText");
                if (surpriseText) {
                    if (Date.now() >= RESULT_TARGET) {
                        surpriseText.textContent = "Countdown mukammal! Ab official board website par roll number check karo! 🎉";
                    } else {
                        surpriseText.textContent = "ABHI NAHI BHAI! 😂 Result se pehle hi itni jaldi? Thora sabr karo aur duayein maango! 🤲";
                    }
                }
            }
        });
    }
}

/**
 * 4. Audio Synthesizer Toggle
 */
function initAudioToggle() {
    const sfxBtn = document.getElementById("sfxToggleBtn");
    if (!sfxBtn) return;

    function updateBtnText() {
        sfxBtn.innerHTML = surpriseEngine.isMuted 
            ? "🔇 Sound OFF" 
            : "🔊 Sound ON";
    }

    updateBtnText();

    sfxBtn.addEventListener("click", () => {
        const isMuted = surpriseEngine.toggleMute();
        updateBtnText();
        surpriseEngine.showToast(isMuted ? "Sound mute kar diya!" : "Sound on kar diya!", isMuted ? "🔇" : "🔊");
        if (!isMuted) surpriseEngine.playSfx('pop');
    });
}
