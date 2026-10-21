/**
 * Pakistani Student Result Day Surprise Engine
 * Handles non-repeating random joke selection, harmless jump-scare effects,
 * screen shakes, emoji explosions, audio synthesized effects, and button hooks.
 */

class ResultSurpriseEngine {
    constructor() {
        this.jokes = typeof PAKISTANI_RESULT_JOKES !== 'undefined' ? PAKISTANI_RESULT_JOKES : [];
        this.scenarios = typeof SCARY_SUSPENSE_SCENARIOS !== 'undefined' ? SCARY_SUSPENSE_SCENARIOS : [];
        
        // Shuffle deck to prevent repeating jokes
        this.unseenDeck = [];
        this.seenHistory = [];
        this.activeCategory = "All";
        this.isMuted = (typeof localStorage !== 'undefined' && localStorage.getItem) 
            ? localStorage.getItem('result_sfx_muted') === 'true' 
            : false;

        // Initialize audio context lazily
        this.audioCtx = null;

        // Initialize
        this.initDeck();
        if (typeof document !== 'undefined' && document.createElement) {
            this.initDOM();
        }

    }

    /**
     * Prepare non-repeating shuffle deck
     */
    initDeck() {
        let pool = this.jokes;
        if (this.activeCategory !== "All") {
            pool = this.jokes.filter(j => j.category === this.activeCategory);
            if (pool.length === 0) pool = this.jokes;
        }

        // Fisher-Yates shuffle
        this.unseenDeck = [...pool];
        for (let i = this.unseenDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.unseenDeck[i], this.unseenDeck[j]] = [this.unseenDeck[j], this.unseenDeck[i]];
        }
    }

    /**
     * Get next non-repeating joke
     */
    getNextJoke(category = null) {
        if (category && category !== this.activeCategory) {
            this.activeCategory = category;
            this.initDeck();
        }

        if (this.unseenDeck.length === 0) {
            this.initDeck();
        }

        const joke = this.unseenDeck.pop();
        this.seenHistory.push(joke.id);
        if (this.seenHistory.length > 50) this.seenHistory.shift();

        return joke;
    }

    /**
     * Sound Synthesizer via Web Audio API (Harmless, lightweight, zero dependencies)
     */
    playSfx(type = 'pop') {
        if (this.isMuted) return;
        try {
            if (!this.audioCtx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.audioCtx = new AudioCtx();
            }
            if (!this.audioCtx) return;
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }

            const ctx = this.audioCtx;
            const now = ctx.currentTime;

            if (type === 'heartbeat') {
                // Low thumping bass pulse
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(80, now);
                osc.frequency.exponentialRampToValueAtTime(30, now + 0.18);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.2);
            } else if (type === 'suspense') {
                // Sci-fi dramatic tension rise
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(140, now);
                osc.frequency.exponentialRampToValueAtTime(380, now + 0.45);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.5);
            } else if (type === 'punchline' || type === 'tada') {
                // Comedic high chime / bounce
                [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.08);
                    gain.gain.setValueAtTime(0.12, now + idx * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + idx * 0.08);
                    osc.stop(now + idx * 0.08 + 0.25);
                });
            } else {
                // Quick pop
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.1);
            }
        } catch (e) {
            // Audio policy blocked or unsupported, silently fail
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('result_sfx_muted', this.isMuted);
        return this.isMuted;
    }

    /**
     * Playful Screen / Card Shake
     */
    shakeScreen(element = null) {
        // Respect reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const target = element || document.querySelector('.container') || document.body;
        target.classList.remove('playful-shake');
        void target.offsetWidth; // Force reflow
        target.classList.add('playful-shake');
        setTimeout(() => {
            target.classList.remove('playful-shake');
        }, 650);

        // Haptic feedback on mobile if supported
        if (navigator.vibrate) {
            navigator.vibrate([40, 60, 40]);
        }
    }

    /**
     * Harmless Emoji Explosion Confetti
     */
    explodeEmojis(originX = null, originY = null, customEmojis = null) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const emojis = customEmojis || ['🩴', '💀', '☕', '🏃‍♂️', '🧮', '🤲', '😱', '🤣', '📄', '🚨', '🍳', '🏏'];
        const count = 24;

        const startX = originX !== null ? originX : window.innerWidth / 2;
        const startY = originY !== null ? originY : window.innerHeight / 2;

        for (let i = 0; i < count; i++) {
            const span = document.createElement('span');
            span.className = 'emoji-particle';
            span.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            // Random physics
            const angle = Math.random() * Math.PI * 2;
            const velocity = 80 + Math.random() * 160;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity - (60 + Math.random() * 40); // slight upward bias
            const rot = (Math.random() - 0.5) * 540;

            span.style.left = `${startX}px`;
            span.style.top = `${startY}px`;
            span.style.setProperty('--tx', `${tx}px`);
            span.style.setProperty('--ty', `${ty}px`);
            span.style.setProperty('--rot', `${rot}deg`);

            document.body.appendChild(span);

            // Clean up
            setTimeout(() => {
                if (span.parentNode) span.parentNode.removeChild(span);
            }, 1200);
        }
    }

    /**
     * Suspense Toast for non-blocking button feedback
     */
    showToast(message, emoji = '🚨', type = 'info') {
        let toastContainer = document.getElementById('surprise-toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'surprise-toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `surprise-toast ${type}`;
        toast.innerHTML = `
            <span class="toast-emoji">${emoji}</span>
            <span class="toast-msg">${message}</span>
        `;

        toastContainer.appendChild(toast);
        this.playSfx('pop');

        setTimeout(() => {
            toast.classList.add('toast-show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('toast-show');
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, 3600);
    }

    /**
     * Trigger Dramatic Suspense Dialog (The "Jump-Scare" Surprise)
     */
    triggerDramaticSurprise(originBtn = null) {
        const scenario = this.scenarios[Math.floor(Math.random() * this.scenarios.length)];
        const joke = this.getNextJoke();

        // Get coordinates for emoji burst
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        if (originBtn) {
            const rect = originBtn.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }

        this.shakeScreen();
        this.playSfx('suspense');

        const modal = document.getElementById('suspense-modal');
        const modalContent = document.getElementById('suspense-content');
        if (!modal || !modalContent) return;

        // Suspense phase
        modalContent.innerHTML = `
            <div class="suspense-card suspense-intro">
                <div class="suspense-badge pulse-fast">🚨 TENSION LEVEL: MAXIMUM</div>
                <div class="suspense-icon spin-wobble">😱</div>
                <h2 class="suspense-heading">${scenario.title}</h2>
                <div class="suspense-progress-bar">
                    <div class="suspense-progress-fill"></div>
                </div>
                <p class="suspense-subtext">${scenario.suspense}</p>
                <p class="suspense-dialogue">${scenario.dialogue}</p>
            </div>
        `;
        modal.classList.add('active');

        // Play heartbeat twice
        setTimeout(() => this.playSfx('heartbeat'), 300);
        setTimeout(() => this.playSfx('heartbeat'), 700);

        // Punchline phase after 1.2 seconds
        setTimeout(() => {
            this.playSfx('tada');
            this.explodeEmojis(x, y);

            modalContent.innerHTML = `
                <div class="suspense-card punchline-reveal">
                    <button class="modal-close-btn" onclick="surpriseEngine.closeModal()" aria-label="Close Surprise">✕</button>
                    <div class="suspense-badge tag-comedy">😂 COMEDY RELIEF UNLOCKED</div>
                    <div class="punchline-emoji bounce-pop">${joke.emoji || '🤣'}</div>
                    <div class="category-chip">${joke.category} • #${joke.id}</div>
                    <h3 class="punchline-heading">${scenario.punchline}</h3>
                    <div class="punchline-box">
                        <p class="punchline-joke-text">"${joke.text}"</p>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-action primary-glow" onclick="surpriseEngine.triggerDramaticSurprise()">
                            😈 Ek Aur Surprise Do!
                        </button>
                        <button class="btn-action secondary-glow" onclick="surpriseEngine.copyJokeText('${encodeURIComponent(joke.text)}')">
                            📋 Copy Joke
                        </button>
                        <button class="btn-action close-outline" onclick="surpriseEngine.closeModal()">
                            ✅ Shukar Hai Pass Ho Gaya
                        </button>
                    </div>
                </div>
            `;
        }, 1300);
    }

    closeModal() {
        const modal = document.getElementById('suspense-modal');
        if (modal) modal.classList.remove('active');
    }

    copyJokeText(encodedText) {
        const text = decodeURIComponent(encodedText);
        navigator.clipboard.writeText(text).then(() => {
            this.showToast("Joke copy ho gaya! Ab doston aur group mein share karo 😂", "📋", "success");
        }).catch(() => {
            this.showToast("Joke copy nahi ho saka, manual copy karein!", "⚠️", "warning");
        });
    }

    /**
     * Create interactive DOM elements if not already in index.html
     */
    initDOM() {
        // Create modal overlay if missing
        if (!document.getElementById('suspense-modal')) {
            const modal = document.createElement('div');
            modal.id = 'suspense-modal';
            modal.className = 'suspense-modal-overlay';
            modal.innerHTML = `
                <div class="suspense-modal-box">
                    <div id="suspense-content"></div>
                </div>
            `;
            // Close on overlay click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal();
            });
            document.body.appendChild(modal);
        }

        // Add Escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    /**
     * Attach random funny surprise effect to any button without blocking its original functionality
     */
    attachButtonSurprise(button, config = {}) {
        if (!button) return;

        button.addEventListener('click', (e) => {
            const isDedicated = config.isDedicated || false;
            const actionName = config.name || button.textContent.trim();

            if (isDedicated) {
                // Primary dramatic modal
                this.triggerDramaticSurprise(button);
                return;
            }

            // Quick playful warnings / dialogs for search/submit/refresh/back
            const quickSurprises = [
                { emoji: "🚨", msg: "DANGER! Abu WhatsApp par typing kar rahe hain! 💀" },
                { emoji: "🩴", msg: "Ammi ne chappal target lock kar li hai! 😂" },
                { emoji: "📶", msg: "System: Student ki tayari 0% mili! Duaon par switch ho rahe hain! 🤲" },
                { emoji: "🧮", msg: "Calculator ne resign kar diya aapka roll number dekh kar! 🤣" },
                { emoji: "⚡", msg: "440 Volt Jhatka Alert! Dil tham kar bethein! 😱" },
                { emoji: "🏃‍♂️", msg: "Backdoor exit plan tayar hai bhagne ka? 🚪💨" },
                { emoji: "📞", msg: "Phuppo ki incoming call reject kar di gayi hai! 🐍📵" }
            ];

            const pick = quickSurprises[Math.floor(Math.random() * quickSurprises.length)];

            // Playful shake & audio
            this.shakeScreen(button);
            this.playSfx(Math.random() > 0.5 ? 'heartbeat' : 'pop');

            // 1 out of 4 clicks will burst mini emojis
            if (Math.random() > 0.6) {
                const rect = button.getBoundingClientRect();
                this.explodeEmojis(rect.left + rect.width / 2, rect.top + rect.height / 2, [pick.emoji, '🤣', '💀']);
            }

            // Show toast message
            this.showToast(`${actionName}: ${pick.msg}`, pick.emoji);
        });
    }
}

// Global instance
const surpriseEngine = new ResultSurpriseEngine();

if (typeof window !== 'undefined') {
    window.surpriseEngine = surpriseEngine;
    window.ResultSurpriseEngine = ResultSurpriseEngine;
}
if (typeof globalThis !== 'undefined') {
    globalThis.surpriseEngine = surpriseEngine;
    globalThis.ResultSurpriseEngine = ResultSurpriseEngine;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ResultSurpriseEngine, surpriseEngine };
}

