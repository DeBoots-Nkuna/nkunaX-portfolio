// Welcome page exit transition
const enterBtn = document.getElementById(
  'enter-btn'
) as HTMLAnchorElement | null

if (enterBtn) {
  enterBtn.addEventListener('click', (event) => {
    event.preventDefault()

    const targetUrl = enterBtn.href

    document.body.classList.add('welcome-leaving')

    setTimeout(() => {
      window.location.href = targetUrl
    }, 850)
  })
}
