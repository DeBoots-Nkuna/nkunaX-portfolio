const arrowRight = document.querySelector<HTMLButtonElement>(
  '.project-box .navigation .arrow-right'
)

const arrowLeft = document.querySelector<HTMLButtonElement>(
  '.project-box .navigation .arrow-left'
)

const imgSlide = document.querySelector<HTMLElement>(
  '.project-carousel .img-slide'
)

const slideItems = document.querySelectorAll<HTMLElement>(
  '.project-carousel .img-item'
)

let index = 0
const maxIndex = Math.max(slideItems.length - 1, 0)

function updateNavigation() {
  if (!arrowLeft || !arrowRight) return

  const isAtStart = index === 0
  const isAtEnd = index === maxIndex

  arrowLeft.disabled = isAtStart
  arrowRight.disabled = isAtEnd

  arrowLeft.classList.toggle('disabled', isAtStart)
  arrowRight.classList.toggle('disabled', isAtEnd)
}

function activeProject() {
  const projectDetails = document.querySelector('.project-detail')

  //if statement to check if slide element exists
  if (!imgSlide) return
  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
    index * 2
  }rem))`

  updateNavigation()
}

// right arrow btn (next)
arrowRight?.addEventListener('click', () => {
  if (index < maxIndex) {
    index++
  } else {
    index = maxIndex
  }

  activeProject()
})

// left arrow btn (previous)
arrowLeft?.addEventListener('click', () => {
  if (index > 0) {
    index--
  } else {
    index = 0
  }

  activeProject()
})

updateNavigation()
