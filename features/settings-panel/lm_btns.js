document.getElementById('set-panel__lm-btn-n')
        .addEventListener('click', () => learningMethodButtons("1"));

document.getElementById('set-panel__lm-btn-ll')
        .addEventListener('click', () => learningMethodButtons("2"));

function learningMethodButtons(buttonType) {
    // check witch button was pressed
    if (buttonType == "1") {
        learningMethod = 1
    } else if (buttonType == "2") {
        learningMethod = 2
    }
    type = learningMethod;
}