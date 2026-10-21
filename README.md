# 1st Year Result 😱 — Pakistani Student Result Countdown & Comedy Vault

A modern, responsive **White Glassmorphism** web app built for Pakistani intermediate (1st Year / HSSC-I) students awaiting their board results. Features a real-time live countdown to Result Day, **120+ hilarious Pakistani student jokes**, harmless dramatic suspense jump-scare effects, emoji confetti explosions, and synthesized Web Audio sound effects.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-yellow.svg)
![CSS3 Glassmorphism](https://img.shields.io/badge/Theme-White%20Glassmorphism-6366f1.svg)
![Jokes Count](https://img.shields.io/badge/Jokes-122%20Original-ec4899.svg)

---

## ✨ Features

### 1. ⏱️ Live Result Day Countdown
- Live real-time countdown to **22 October 2026, 10:00 AM PKT (Pakistan Standard Time)**.
- Precision 4-tile grid counting **Days**, **Hours**, **Minutes**, and **Seconds**.
- Interactive tension-meter face emoji (`😰`, `😱`, `💀`, `🤲`, `🫀`) that changes expression and releases tension on click.

### 2. 😂 120+ Pakistani Student Jokes (`jokes.js`)
Contains **122 unique, original jokes** in Roman Urdu and Hinglish covering all relatable student experiences:
- **🩴 Ammi & Abu Reactions**: Chappal warnings, Wi-Fi password changes, nashta omelet vs anda, belt sound checks.
- **📞 Rishtedaar & Phuppo**: 9:59 AM calls, airplane mode defense, relative comparisons, chullu bhar paani gifts.
- **🤣 Friends & Toppers**: "Yaar fail ho jaungi" (98%), backbencher solidarity, 33% celebrations, biryani deg promises.
- **💓 Result Day Panic**: 200 BPM heartbeats, 9:59 to 10:00 AM tension, bathroom tours, one-eye screen peeking.
- **🧮 Roll No, Marks & Supply**: "Special Supplementary Opportunity", calculator resignations, Body Temperature percentage.
- **🤲 Student Duas & Waade**: Tahajjud promises, 10-minute mobile detox, examiner mood duas.
- **🏫 Teachers & Board**: Server crashes, physics poetry essays, gazette weapons, 404 prank IT teams.
- **🚨 Mini Suspense Dialogues**: *"🚨 DANGER! Abu is typing... *Photo of a flying chappal incoming* 🩴📱💀"*.

### 3. 🎲 Anti-Repetition Shuffle Engine
- Implemented with a **Fisher-Yates shuffle queue** in `surprise.js`.
- Guarantees that users will never see the same joke repeated until all 122 jokes in the category have been cycled through.

### 4. 😈 Harmless Scary-Funny Surprise Engine (`surprise.js`)
- **Dramatic Suspense Modal (The Jump-Scare)**:
  - **Phase 1 (Suspense)**: Heartbeat bass audio pulses, dramatic rising chord, progress scanner (`Scanning BISE database... Detecting Abu's GPS... Heartbeat: 210 BPM!`).
  - **Phase 2 (Comedy Relief)**: Confetti emoji burst (🩴, 💀, ☕, 🏃‍♂️, 🧮), comedy fanfare, and personalized joke punchline with copy/share buttons.
- **Playful Screen Shakes**: Micro-animations with mobile haptic vibration (`navigator.vibrate`) support.
- **Emoji Particle Explosions**: Physics-based DOM particle burst radiating from clicked buttons.
- **Web Audio Synthesizer**: Zero external audio files required. Uses the browser's built-in Web Audio API to synthesize heartbeats, suspense sweeps, and pop chimes.
- **Sound Toggle**: Accessible **🔊 Sound ON / 🔇 Sound OFF** button persisted in `localStorage`.

### 5. 💎 White Glassmorphism & Horizontal Hero Layout
- **Pastel Mesh Backdrop**: Floating organic blur orbs in soft lavender, rose, sky blue, and amber.
- **Horizontal Top Hero Section**: Positioned directly underneath the header with the title, alert tag, subtitle, interactive face, countdown, and action buttons.
- **Full-Width Joke Vault**: Positioned directly below the hero card with category filter pills, large frosted quote box, toolbar, and Student Survival widgets.
- **Typography**: Google Fonts **Outfit** (headings, countdown numerals, buttons) and **Plus Jakarta Sans** (body & joke text).
- **Responsive**: Fully optimized for desktop, tablet, and mobile screens down to 320px width.
- **Accessibility**: Full support for `prefers-reduced-motion` media queries.

---

## 📁 Project Structure

```
countdown/
├── index.html       # Main HTML5 page with horizontal hero & glassmorphism layout
├── style.css        # White glassmorphism styles, responsive grid & animations
├── app.js           # Main app controller, countdown timer & joke carousel logic
├── jokes.js         # 122 categorized Pakistani jokes & suspense dialogues data
├── surprise.js      # Reusable ResultSurpriseEngine (SFX, shuffle deck, modal, particles)
└── README.md        # Project documentation
```

---

## 🚀 How to Run Locally

No build tools, npm packages, or external dependencies are required.

### Method 1: Direct File Opening
Double-click `index.html` in your file explorer to open it directly in any modern web browser (Chrome, Edge, Firefox, Safari).

### Method 2: Local HTTP Server

**Using Python:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

**Using Node.js (`npx serve`):**
```bash
npx serve .
```

---

## ⚙️ Customization

### Changing the Result Date
Open [app.js](file:///c:/Users/Ali/Desktop/countdown/app.js) line 7 and edit `RESULT_TARGET`:
```javascript
// Year-Month-DayTHour:Minute:Second+Timezone
const RESULT_TARGET = new Date("2026-10-22T10:00:00+05:00").getTime();
```

### Adding New Jokes
Open [jokes.js](file:///c:/Users/Ali/Desktop/countdown/jokes.js) and append your joke object to `PAKISTANI_RESULT_JOKES`:
```javascript
{
    id: 123,
    category: "Ammi & Abu",
    emoji: "🩴",
    tag: "Chappal Threat",
    text: "Your hilarious Roman Urdu joke here! 😂"
}
```

---

## 📜 Disclaimer

This website is a lighthearted comedy and tension-relief countdown project created for Pakistani intermediate students. It is **not** an official education board website. Official results are published directly by the respective educational boards (e.g., BISE Lahore, FBISE, BIEK Karachi, BISE Rawalpindi).

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
