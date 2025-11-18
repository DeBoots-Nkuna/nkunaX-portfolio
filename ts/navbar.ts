const menuIcon = document.getElementById('menu-icon')
const nav = document.querySelector('header nav')

if (menuIcon && nav) {
  menuIcon.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open')
    document.body.classList.toggle('nav-open', isOpen)

    menuIcon.setAttribute('name', isOpen ? 'close-outline' : 'menu-outline')
  })

  // close menu when a nav link is clicked
  nav.addEventListener('click', (event) => {
    const target = event.target
    if (target instanceof HTMLAnchorElement) {
      nav.classList.remove('open')
      document.body.classList.remove('nav-open')
      menuIcon.setAttribute('name', 'menu-outline')
    }
  })
}
