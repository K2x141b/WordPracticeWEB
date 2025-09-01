document.getElementById('set-panel__reverse-btn').addEventListener('click', () => reverseBtn());

export let reverseBtnState = 0;

function reverseBtn() {
    // Reverse() gets run when the reverse button is pressed
    let name;
    // make a type of flip switch
    if (reverseBtnState === 0) {
        reverseBtnState = 1;
        name = "Fremdsprache → Deutsch";
    } else {
        reverseBtnState = 0;
        name = "Deutsch → Fremdsprache";
    }
    // Change the text of the reverse Button
    document.getElementById("set-panel__reverse-btn").innerText = name;
}