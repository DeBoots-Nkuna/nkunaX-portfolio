document.addEventListener('DOMContentLoaded', () => {
  console.log('NX base script loaded')

  const clickSound = document.querySelector<HTMLAudioElement>('#ui-click-sound')
  const enterSound = document.querySelector<HTMLAudioElement>('#ui-enter-sound')

  function playSound(audioEl: HTMLAudioElement | null): void {
    if (!audioEl) return
    audioEl.currentTime = 0
    audioEl.play().catch(() => {
      // ignore errors
    })
  }

  const ENTER_SOUND_DELAY = 160
  const PAGE_EXIT_DURATION = 900 // must match CSS (0.9s)

  // === 1) INDEX PAGE: keep your original tune behaviour ===
  document.querySelectorAll<HTMLElement>('.enter-btn').forEach((el) => {
    el.addEventListener('click', () => {
      // Same as before: click + then woosh
      playSound(clickSound)
      window.setTimeout(() => playSound(enterSound), ENTER_SOUND_DELAY)
      // Navigation + matrix exit is still handled in index.js
    })
  })

  // === 2) INNER PAGES: nav links with smooth exit + same tune ===
  const navBtns = document.querySelectorAll<HTMLAnchorElement>('.btn-sound')
  console.log('[sound] .btn-sound count:', navBtns.length)

  navBtns.forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault()

      const href = el.href
      console.log('[nav] clicked:', href)

      // Add exit animation on body
      if (!document.body.classList.contains('page-leaving')) {
        document.body.classList.add('page-leaving')
      }

      // Play the same "tune" as index: click + woosh
      playSound(clickSound)
      window.setTimeout(() => playSound(enterSound), ENTER_SOUND_DELAY)

      // After exit animation, go to the new page
      window.setTimeout(() => {
        window.location.href = href
      }, PAGE_EXIT_DURATION)
    })
  })
})

// cursor pointer effects
// const cursorTrailContainer = document.getElementById(
//   'cursor-trail-container'
// ) as HTMLDivElement | null

// if (cursorTrailContainer && isDesktop) {
//   let lastSpawn = 0

//   const colors = ['#bbf7d0', '#4ade80', '#22c55e', '#a3e635'] as const

//   function spawnGlyph(
//     x: number,
//     y: number,
//     opts?: { isClick?: boolean; offsetX?: number; offsetY?: number }
//   ) {
//     const glyph = document.createElement('div')

//     const isClick = opts?.isClick ?? false
//     const offsetX = opts?.offsetX ?? 0
//     const offsetY = opts?.offsetY ?? 0

//     glyph.className = isClick
//       ? 'cursor-glyph cursor-glyph--click'
//       : 'cursor-glyph'

//     const length = isClick
//       ? 18 + Math.random() * 20 // slightly longer for click
//       : 10 + Math.random() * 22

//     const tilt = (Math.random() - 0.5) * 24 // -12° to 12°

//     const color = colors[Math.floor(Math.random() * colors.length)] ?? '#22c55e'

//     glyph.style.left = `${x + offsetX}px`
//     glyph.style.top = `${y + offsetY}px`
//     glyph.style.height = `${length}px`
//     glyph.style.backgroundColor = color
//     glyph.style.boxShadow = `0 0 14px ${color}`
//     glyph.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`

//     const duration = isClick
//       ? 0.45 + Math.random() * 0.15 // click: 0.45–0.6s
//       : 0.45 + Math.random() * 0.25 // move: 0.45–0.7s

//     glyph.style.animationDuration = `${duration}s`

//     cursorTrailContainer?.appendChild(glyph)

//     setTimeout(() => {
//       glyph.remove()
//     }, duration * 1000 + 120)
//   }

//   // Regular rain trail on move
//   window.addEventListener('mousemove', (e: MouseEvent) => {
//     const now = performance.now()
//     if (now - lastSpawn < 20) return
//     lastSpawn = now

//     spawnGlyph(e.clientX, e.clientY)
//   })

//   // Splash burst on click
//   window.addEventListener('click', (e: MouseEvent) => {
//     const centerX = e.clientX
//     const centerY = e.clientY

//     // create a small radial burst
//     const count = 6 // number of bars in splash

//     for (let i = 0; i < count; i++) {
//       const angle = (Math.PI * 2 * i) / count
//       const radius = 10 + Math.random() * 14 // distance from center

//       const offsetX = Math.cos(angle) * radius
//       const offsetY = Math.sin(angle) * radius

//       spawnGlyph(centerX, centerY, {
//         isClick: true,
//         offsetX,
//         offsetY,
//       })
//     }
//   })
// }
