const clickSound = document.getElementById('ui-click-sound');
const enterSound = document.getElementById('ui-enter-sound');
const soundToggleBtn = document.querySelector('.sound-toggle');
// Only enable sounds on desktop with a real mouse
const isDesktop = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 900;
let soundEnabled = isDesktop && localStorage.getItem('nx_sound_enabled') !== 'false';
const updateSoundToggleLabel = () => {
    if (!soundToggleBtn)
        return;
    soundToggleBtn.textContent = soundEnabled ? '🔊 Sound: On' : '🔈 Sound: Off';
    soundToggleBtn.setAttribute('aria-pressed', soundEnabled ? 'true' : 'false');
};
// If not desktop → hide toggle and bail early (no sounds on mobile / tablet)
if (!isDesktop) {
    if (soundToggleBtn) {
        soundToggleBtn.style.display = 'none';
    }
}
else {
    // Desktop: init toggle + listeners
    updateSoundToggleLabel();
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            localStorage.setItem('nx_sound_enabled', soundEnabled ? 'true' : 'false');
            updateSoundToggleLabel();
        });
    }
    function playSound(audioEl) {
        if (!soundEnabled || !audioEl)
            return;
        audioEl.currentTime = 0;
        audioEl.play().catch(() => {
            // ignore autoplay errors
        });
    }
    // 1) Enter Grid button – click + whoosh together
    document.querySelectorAll('.enter-btn').forEach((el) => {
        el.addEventListener('click', () => {
            playSound(clickSound);
            playSound(enterSound);
        });
    });
    // 2) Nav links – soft click only
    document
        .querySelectorAll('header nav a')
        .forEach((link) => {
        link.addEventListener('click', () => {
            playSound(clickSound);
        });
    });
    //specific btns sound clicks
    // Add class="btn-sound" to them and use:
    //
    // document
    //   .querySelectorAll<HTMLElement>('.btn-sound')
    //   .forEach((el) => {
    //     el.addEventListener('click', () => playSound(clickSound))
    //   })
}
// Matrix cursor trail – desktop only
const cursorTrailContainer = document.getElementById('cursor-trail-container');
if (cursorTrailContainer && isDesktop) {
    let lastSpawn = 0;
    window.addEventListener('mousemove', (e) => {
        var _a;
        const now = performance.now();
        // throttle so we don't spawn too many
        if (now - lastSpawn < 20)
            return;
        lastSpawn = now;
        const glyph = document.createElement('div');
        glyph.className = 'cursor-glyph';
        // random length and tilt for variation
        const length = 10 + Math.random() * 22;
        const tilt = (Math.random() - 0.5) * 24;
        // slightly different green shades
        const colors = ['#bbf7d0', '#4ade80', '#22c55e', '#a3e635'];
        const color = (_a = colors[Math.floor(Math.random() * colors.length)]) !== null && _a !== void 0 ? _a : '#22c55e';
        glyph.style.left = `${e.clientX}px`;
        glyph.style.top = `${e.clientY}px`;
        glyph.style.height = `${length}px`;
        glyph.style.backgroundColor = color;
        glyph.style.boxShadow = `0 0 14px ${color}`;
        glyph.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`;
        // small random variation in animation time
        const duration = 0.45 + Math.random() * 0.25; // 0.45s–0.7s
        glyph.style.animationDuration = `${duration}s`;
        cursorTrailContainer.appendChild(glyph);
        // cleanup
        setTimeout(() => {
            glyph.remove();
        }, duration * 1000 + 120);
    });
}
export {};
//# sourceMappingURL=base.js.map