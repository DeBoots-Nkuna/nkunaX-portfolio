const canvas = document.getElementById('matrix');
if (canvas) {
    const ctx = canvas.getContext('2d');
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
        // initial setup
        resize();
        const draw = () => {
            var _a;
            // translucent background for trail effect
            ctx.fillStyle = 'rgba(31, 36, 45, 0.25)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#7cf03d';
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const y = (_a = drops[i]) !== null && _a !== void 0 ? _a : 1; // fallback so it's never undefined
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                const x = i * fontSize;
                ctx.fillText(text, x, y * fontSize);
                let newY = y + 1;
                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    newY = 0;
                }
                drops[i] = newY; // safe write-back
            }
        };
        window.addEventListener('resize', resize);
        setInterval(draw, 50);
    }
}
export {};
//# sourceMappingURL=index.js.map