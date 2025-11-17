console.log('NkunaX portfolio loaded.')

const resumeBtns = document.querySelectorAll('.resume-btn')

resumeBtns.forEach((btn, idx) => {
  //resume details
  const resumeDetails = document.querySelectorAll('.resume-detail')

  //resume btns
  btn.addEventListener('click', () => {
    resumeBtns.forEach((btn) => {
      btn.classList.remove('active')
    })
    btn.classList.add('active')

    //resume description
    resumeDetails.forEach((detail) => {
      detail.classList.remove('active')
    })

    resumeDetails[idx]?.classList.add('active')
  })
})
