const canvas = document.getElementById('matrix');
if (canvas) {
    const ctx = canvas.getContext('2d');
    // matrix bg
    if (ctx) {
        const chars = '01✓⚡+×•';
        const fontSize = 16;
        let columns = 0;
        let drops = [];
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array.from({ length: columns }, () => 1);
        };
        resize();
        const draw = () => {
            var _a;
            ctx.fillStyle = 'rgba(31, 36, 45, 0.25)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#7cf03d';
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const y = (_a = drops[i]) !== null && _a !== void 0 ? _a : 1;
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                const x = i * fontSize;
                ctx.fillText(text, x, y * fontSize);
                let newY = y + 1;
                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    newY = 0;
                }
                drops[i] = newY;
            }
        };
        window.addEventListener('resize', resize);
        setInterval(draw, 50);
    }
}
// Welcome page exit transition
const enterBtn = document.getElementById('enter-btn');
if (enterBtn) {
    enterBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const targetUrl = enterBtn.href;
        document.body.classList.add('welcome-leaving');
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 850);
    });
}
export {};
//# sourceMappingURL=index.js.map