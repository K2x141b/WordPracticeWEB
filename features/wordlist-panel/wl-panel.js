import { startPracticing } from "../practice-panel/start-practicing.js";
import store from "../../app/store.js";
import { wlFilePaths } from "../../database/wl-file-paths.js";

export function populateLanguageSelection() {
    // clear the rows of languagelists (clear previous content) and set the container value
    const container = document.getElementById("wl-panel");
    container.innerHTML = "";

    // Create buttons for each language
    for (const language in wlFilePaths) {

        const button = document.createElement("button");
        button.classList.add("wl-panel__lang-btn");

        button.innerText = language;

        button.onclick = () => populateWordListRows(language);
        container.appendChild(button);
    }
}

export function populateWordListRows(language) {
    store.state.selWordlistGroup = language;

    const container = document.getElementById("wl-panel");
    container.innerHTML = "";

    const lists = wlFilePaths[language].slice(1);
    console.log(wlFilePaths[language])

    // loop trough the list names
    for (const listName of lists) {

        const row = document.createElement("div");
        row.classList.add("wl-panel__lang-btn");

        row.innerText = listName;
        row.onclick = () => startPracticing(language, listName);
        container.appendChild(row);
    }
}

populateLanguageSelection();