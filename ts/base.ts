document.addEventListener('DOMContentLoaded', () => {
  console.log('NX base script loaded')

  const clickSound = document.querySelector<HTMLAudioElement>('#ui-click-sound')
  const enterSound = document.querySelector<HTMLAudioElement>('#ui-enter-sound')
  const ambientSound =
    document.querySelector<HTMLAudioElement>('#ui-ambient-sound')

  const soundToggleBtn =
    document.querySelector<HTMLButtonElement>('.sound-toggle')

  //display sound on by default
  let soundEnabled = localStorage.getItem('nx_sound_enabled') !== 'false'

  //toggle sound on or off
  const updateSoundToggleLabel = (): void => {
    if (!soundToggleBtn) return
    soundToggleBtn.textContent = soundEnabled ? '🔊 Sound: On' : '🔈 Sound: Off'
    soundToggleBtn.setAttribute('aria-pressed', soundEnabled ? 'true' : 'false')
  }

  function playSound(audioEl: HTMLAudioElement | null): void {
    if (!soundEnabled || !audioEl) return
    audioEl.currentTime = 0
    audioEl.play().catch(() => {})
  }

  // --- Ambient Matrix rain (welcome page only) ---
  let ambientStarted = false

  const updateAmbient = () => {
    if (!ambientSound) return

    if (!soundEnabled) {
      // stop if user turned sound off
      ambientSound.pause()
      ambientSound.currentTime = 0
      ambientStarted = false
      return
    }

    // low volume, looping
    ambientSound.loop = true
    ambientSound.volume = 0.2

    ambientSound
      .play()
      .then(() => {
        ambientStarted = true

        // if the tip bubble is visible, hide it
        const hint = document.querySelector<HTMLDivElement>('.sound-hint')
        if (hint) {
          hint.classList.add('sound-hint--hide')
          setTimeout(() => hint.remove(), 260)
        }
      })
      .catch(() => {})
  }

  //sound toggle btn

  if (soundToggleBtn) {
    updateSoundToggleLabel()
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled
      localStorage.setItem('nx_sound_enabled', soundEnabled ? 'true' : 'false')
      updateSoundToggleLabel()
      updateAmbient()
    })
  }

  //trying auto play
  if (ambientSound) {
    // Create the little "click to enable sound" bubble
    const showAmbientHint = () => {
      // if already on screen, don't add another
      if (document.querySelector('.sound-hint')) return

      const div = document.createElement('div')
      div.className = 'sound-hint'
      div.textContent = 'Tip: click anywhere on the Matrix to enable sound.'
      document.body.appendChild(div)
    }

    const tryStartAmbient = () => {
      if (!soundEnabled) return

      if (!ambientStarted) {
        updateAmbient()
      }

      //display hit if sound no play auto
      if (!ambientStarted) {
        showAmbientHint()
      }
    }
    setTimeout(() => {
      tryStartAmbient()
    }, 800)

    window.addEventListener(
      'click',
      () => {
        tryStartAmbient()
      },
      { once: true }
    )
  }

  const ENTER_SOUND_DELAY = 160
  const PAGE_EXIT_DURATION = 900

  //  welcome page exit sound effects
  document.querySelectorAll<HTMLElement>('.enter-btn').forEach((el) => {
    el.addEventListener('click', () => {
      // same tune you like: click snd then woosh
      playSound(clickSound)
      window.setTimeout(() => playSound(enterSound), ENTER_SOUND_DELAY)
    })
  })

  //inner pages exit sound effects
  const navBtns = document.querySelectorAll<HTMLAnchorElement>('.btn-sound')

  navBtns.forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault()
      const href = el.href

      // trigger shared Matrix transition layer
      if (!document.body.classList.contains('page-leaving')) {
        document.body.classList.add('page-leaving')
      }

      // play same tune as welcome: click + woosh
      playSound(clickSound)
      window.setTimeout(() => playSound(enterSound), ENTER_SOUND_DELAY)

      // after overlay animation, navigate
      window.setTimeout(() => {
        window.location.href = href
      }, PAGE_EXIT_DURATION)
    })
  })

  //cursor trail matrix animation effects
  const cursorTrailContainer = document.getElementById(
    'cursor-trail-container'
  ) as HTMLDivElement | null

  // checking screen size to restrict pointer animation
  const isWideScreen = window.innerWidth >= 900

  if (cursorTrailContainer && isWideScreen) {
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

      const length = isClick ? 18 + Math.random() * 20 : 10 + Math.random() * 22

      const tilt = (Math.random() - 0.5) * 24

      const color =
        colors[Math.floor(Math.random() * colors.length)] ?? '#22c55e'

      glyph.style.left = `${x + offsetX}px`
      glyph.style.top = `${y + offsetY}px`
      glyph.style.height = `${length}px`
      glyph.style.backgroundColor = color
      glyph.style.boxShadow = `0 0 14px ${color}`
      glyph.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`

      const duration = isClick
        ? 0.45 + Math.random() * 0.15
        : 0.45 + Math.random() * 0.25

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

      const count = 6
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count
        const radius = 10 + Math.random() * 14

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

  //matrix rail background
  const canvas = document.getElementById('matrix') as HTMLCanvasElement | null
  if (canvas) {
    const ctx = canvas.getContext('2d')

    // matrix bg
    if (ctx) {
      const chars = '01✓⚡+×•'
      const fontSize = 16

      let columns = 0
      let drops: number[] = []

      const resize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        columns = Math.floor(canvas.width / fontSize)
        drops = Array.from({ length: columns }, () => 1)
      }

      resize()

      const draw = () => {
        ctx.fillStyle = 'rgba(31, 36, 45, 0.25)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#7cf03d'
        ctx.font = `${fontSize}px monospace`

        for (let i = 0; i < drops.length; i++) {
          const y = drops[i] ?? 1
          const text = chars.charAt(Math.floor(Math.random() * chars.length))
          const x = i * fontSize

          ctx.fillText(text, x, y * fontSize)

          let newY = y + 1
          if (y * fontSize > canvas.height && Math.random() > 0.975) {
            newY = 0
          }

          drops[i] = newY
        }
      }

      window.addEventListener('resize', resize)
      setInterval(draw, 50)
    }
  }
})
