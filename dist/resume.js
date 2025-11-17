console.log('NkunaX portfolio loaded.');
const resumeBtns = document.querySelectorAll('.resume-btn');
resumeBtns.forEach((btn, idx) => {
    //resume details
    const resumeDetails = document.querySelectorAll('.resume-detail');
    //resume btns
    btn.addEventListener('click', () => {
        var _a;
        resumeBtns.forEach((btn) => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');
        //resume description
        resumeDetails.forEach((detail) => {
            detail.classList.remove('active');
        });
        (_a = resumeDetails[idx]) === null || _a === void 0 ? void 0 : _a.classList.add('active');
    });
});
export {};
//# sourceMappingURL=resume.js.map