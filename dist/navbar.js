window.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const nav = document.querySelector('header nav');
    if (!menuIcon || !nav)
        return;
    // Toggle mobile nav
    menuIcon.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        document.body.classList.toggle('nav-open', isOpen);
        menuIcon.setAttribute('name', isOpen ? 'close-outline' : 'menu-outline');
    });
    // Close nav when any link is tapped
    nav.addEventListener('click', (event) => {
        const target = event.target;
        if (!target)
            return;
        const link = target.closest('a');
        if (!link)
            return;
        nav.classList.remove('open');
        document.body.classList.remove('nav-open');
        menuIcon.setAttribute('name', 'menu-outline');
    });
});
export {};
//# sourceMappingURL=navbar.js.map