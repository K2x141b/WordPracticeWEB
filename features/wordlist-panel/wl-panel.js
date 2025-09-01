import { wordLists } from "../../database/word-lists.js";

import { startPracticing } from "../practice-panel/start-practicing.js";

let active_language;

export function populateLanguageSelection() {
    // clear the rows of languagelists (clear previous content) and set the container value
    const container = document.getElementById("wl-panel__div");
    container.innerHTML = "";

    // Create buttons for each language
    for (const language in wordLists) {
        // creates a button and adds a css style to it
        const button = document.createElement("button");
        button.classList.add("wl-panel__lang-btn");

        // Set the buttons text to the language with a capitalized first letter
        button.innerText = language;

        // when the buttons gets clicked run the function populateWordListRows and add it to the rows of languagelists
        button.onclick = () => populateWordListRows(language);
        container.appendChild(button);
    }
}

export function populateWordListRows(language) {
    // remember what language it is
    active_language = language;

    // clear the languagelists rows and set the container value
    const container = document.getElementById("wl-panel__div");
    container.innerHTML = "";

    // get the wordlists from the language that was selected
    const lists = wordLists[language];

    // loop trough the list names
    for (const listName in lists) {
        // filter out the list named settings
        if (listName !== "settings") {
            // create an div element and add the css style
            const row = document.createElement("div");
            row.classList.add("wl-panel__lang-btn");

            // Set the div to have a name, make it a button and add it to the container
            row.innerText = listName;
            row.onclick = () => startPracticing(language, listName);
            container.appendChild(row);
        }
    }
}

populateLanguageSelection();