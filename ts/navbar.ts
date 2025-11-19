window.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById('menu-icon') as HTMLElement | null
  const nav = document.querySelector('header nav') as HTMLElement | null

  if (!menuIcon || !nav) return

  // Toggle mobile nav
  menuIcon.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open')
    document.body.classList.toggle('nav-open', isOpen)

    menuIcon.setAttribute('name', isOpen ? 'close-outline' : 'menu-outline')
  })

  // Close nav when any link is tapped
  nav.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement | null
    if (!target) return

    const link = target.closest('a') as HTMLAnchorElement | null
    if (!link) return

    nav.classList.remove('open')
    document.body.classList.remove('nav-open')
    menuIcon.setAttribute('name', 'menu-outline')
  })
})
