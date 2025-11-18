const arrowRight = document.querySelector('.project-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.project-box .navigation .arrow-left');
const imgSlide = document.querySelector('.project-carousel .img-slide');
const slideItems = document.querySelectorAll('.project-carousel .img-item');
let index = 0;
const maxIndex = Math.max(slideItems.length - 1, 0);
function updateNavigation() {
    if (!arrowLeft || !arrowRight)
        return;
    const isAtStart = index === 0;
    const isAtEnd = index === maxIndex;
    arrowLeft.disabled = isAtStart;
    arrowRight.disabled = isAtEnd;
    arrowLeft.classList.toggle('disabled', isAtStart);
    arrowRight.classList.toggle('disabled', isAtEnd);
}
function activeProject() {
    var _a;
    const projectDetails = document.querySelectorAll('.project-detail');
    //if statement to check if slide element exists
    if (!imgSlide)
        return;
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
    projectDetails.forEach((detail) => {
        detail.classList.remove('active');
    });
    (_a = projectDetails[index]) === null || _a === void 0 ? void 0 : _a.classList.add('active');
    updateNavigation();
}
// right arrow btn (next)
arrowRight === null || arrowRight === void 0 ? void 0 : arrowRight.addEventListener('click', () => {
    if (index < maxIndex) {
        index++;
    }
    else {
        index = maxIndex;
    }
    activeProject();
});
// left arrow btn (previous)
arrowLeft === null || arrowLeft === void 0 ? void 0 : arrowLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
    }
    else {
        index = 0;
    }
    activeProject();
});
activeProject();
export {};
//# sourceMappingURL=projects.js.map