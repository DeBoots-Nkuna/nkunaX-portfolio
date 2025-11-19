console.log('NX base script loaded')
const clickSound = document.querySelector<HTMLAudioElement>('#ui-click-sound')
const enterSound = document.querySelector<HTMLAudioElement>('#ui-enter-sound')
const soundToggleBtn =
  document.querySelector<HTMLButtonElement>('.sound-toggle')

// Only enable on desktop
const isDesktop =
  window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 900

let soundEnabled =
  isDesktop && localStorage.getItem('nx_sound_enabled') !== 'false'

const updateSoundToggleLabel = (): void => {
  if (!soundToggleBtn) return
  soundToggleBtn.textContent = soundEnabled ? '🔊 Sound: On' : '🔈 Sound: Off'
  soundToggleBtn.setAttribute('aria-pressed', soundEnabled ? 'true' : 'false')
}

function playSound(audioEl: HTMLAudioElement | null): void {
  if (!soundEnabled || !audioEl) return
  audioEl.currentTime = 0
  audioEl.play().catch(() => {
    // ignore autoplay errors
  })
}

function shouldBypassNavigation(
  event: MouseEvent,
  el: HTMLAnchorElement
): boolean {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return true
  }

  const target = el.getAttribute('target')
  return !!target && target !== '_self'
}

function navigateAfterDelay(
  el: HTMLAnchorElement,
  delayMs: number
): void {
  const href = el.href
  const target = el.getAttribute('target') ?? '_self'

  window.setTimeout(() => {
    if (target === '_self') {
      window.location.href = href
      return
    }

    window.open(href, target)
  }, delayMs)
}

//checking if not desktop device
if (!isDesktop) {
  if (soundToggleBtn) soundToggleBtn.style.display = 'none'
} else {
  // Desktop: init toggle + listeners
  updateSoundToggleLabel()

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled
      localStorage.setItem('nx_sound_enabled', soundEnabled ? 'true' : 'false')
      updateSoundToggleLabel()
    })
  }

  // Entering Grid sound effects
  const ENTER_SOUND_DELAY = 160

  document.querySelectorAll<HTMLElement>('.enter-btn').forEach((el) => {
    el.addEventListener('click', () => {
      playSound(clickSound)
      window.setTimeout(() => playSound(enterSound), ENTER_SOUND_DELAY)
    })
  })

  // Header nav links + any .btn-sound elements get a click sound
  const soundTargets = new Set<HTMLElement>()

  document
    .querySelectorAll<HTMLElement>('.btn-sound')
    .forEach((el) => soundTargets.add(el))

  document
    .querySelectorAll<HTMLAnchorElement>('header nav a')
    .forEach((link) => soundTargets.add(link))

  soundTargets.forEach((el) => {
    el.addEventListener('click', () => {
      playSound(clickSound)
    })
  })
}

// // Matrix cursor trail – desktop only
// const cursorTrailContainer = document.getElementById(
//   'cursor-trail-container'
// ) as HTMLDivElement | null

// if (cursorTrailContainer && isDesktop) {
//   let lastSpawn = 0

//   window.addEventListener('mousemove', (e: MouseEvent) => {
//     const now = performance.now()
//     // throttle so we don't spawn too many
//     if (now - lastSpawn < 20) return
//     lastSpawn = now

//     const glyph = document.createElement('div')
//     glyph.className = 'cursor-glyph'

//     // random length and tilt for variation
//     const length = 10 + Math.random() * 22
//     const tilt = (Math.random() - 0.5) * 24

//     // slightly different green shades
//     const colors = ['#bbf7d0', '#4ade80', '#22c55e', '#a3e635'] as const
//     const color = colors[Math.floor(Math.random() * colors.length)] ?? '#22c55e'

//     glyph.style.left = `${e.clientX}px`
//     glyph.style.top = `${e.clientY}px`
//     glyph.style.height = `${length}px`
//     glyph.style.backgroundColor = color
//     glyph.style.boxShadow = `0 0 14px ${color}`
//     glyph.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`

//     // small random variation in animation time
//     const duration = 0.45 + Math.random() * 0.25
//     glyph.style.animationDuration = `${duration}s`

//     cursorTrailContainer.appendChild(glyph)

//     // cleanup
//     setTimeout(() => {
//       glyph.remove()
//     }, duration * 1000 + 120)
//   })
// }

const cursorTrailContainer = document.getElementById(
  'cursor-trail-container'
) as HTMLDivElement | null

if (cursorTrailContainer && isDesktop) {
  let lastSpawn = 0

  const colors = ['#bbf7d0', '#4ade80', '#22c55e', '#a3e635'] as const

  function spawnGlyph(
    x: number,
    y: number,
    opts?: { isClick?: boolean; offsetX?: number; offsetY?: number }
  ) {
    const glyph = document.createElement('div')

    const isClick = opts?.isClick ?? false
    const offsetX = opts?.offsetX ?? 0
    const offsetY = opts?.offsetY ?? 0

    glyph.className = isClick
      ? 'cursor-glyph cursor-glyph--click'
      : 'cursor-glyph'

    const length = isClick
      ? 18 + Math.random() * 20 // slightly longer for click
      : 10 + Math.random() * 22

    const tilt = (Math.random() - 0.5) * 24 // -12° to 12°

    const color = colors[Math.floor(Math.random() * colors.length)] ?? '#22c55e'

    glyph.style.left = `${x + offsetX}px`
    glyph.style.top = `${y + offsetY}px`
    glyph.style.height = `${length}px`
    glyph.style.backgroundColor = color
    glyph.style.boxShadow = `0 0 14px ${color}`
    glyph.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`

    const duration = isClick
      ? 0.45 + Math.random() * 0.15 // click: 0.45–0.6s
      : 0.45 + Math.random() * 0.25 // move: 0.45–0.7s

    glyph.style.animationDuration = `${duration}s`

    cursorTrailContainer?.appendChild(glyph)

    setTimeout(() => {
      glyph.remove()
    }, duration * 1000 + 120)
  }

  // Regular rain trail on move
  window.addEventListener('mousemove', (e: MouseEvent) => {
    const now = performance.now()
    if (now - lastSpawn < 20) return
    lastSpawn = now

    spawnGlyph(e.clientX, e.clientY)
  })

  // Splash burst on click
  window.addEventListener('click', (e: MouseEvent) => {
    const centerX = e.clientX
    const centerY = e.clientY

    // create a small radial burst
    const count = 6 // number of bars in splash

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count
      const radius = 10 + Math.random() * 14 // distance from center

      const offsetX = Math.cos(angle) * radius
      const offsetY = Math.sin(angle) * radius

      spawnGlyph(centerX, centerY, {
        isClick: true,
        offsetX,
        offsetY,
      })
    }
  })
}
