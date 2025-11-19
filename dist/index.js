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