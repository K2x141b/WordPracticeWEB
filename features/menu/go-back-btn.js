import { populateLanguageSelection } from "../wordlist-panel/wl-panel.js";

document.getElementById('menu__back-btn').addEventListener('click', () => goBack());

function goBack() {
    // Hide the practice box, show list selection, and hide "Back to Selection" button
    document.getElementById("prac-panel").classList.add("u-hidden");
    document.getElementById("prac-panel__score-disp").classList.add("u-hidden");
    document.getElementById("set-panel").classList.remove("u-hidden");
    document.getElementById("wl-panel").classList.remove("u-hidden");
    populateLanguageSelection();
}