import { state } from "../../app/state.js";
import { wordLists } from "../../database/word-lists.js";
import { reverseBtnState } from "../settings-panel/reverse-btn.js";
import { show, hide, setText } from "../../utils/show-hide.js";
import { shuffleLists } from "../../utils/shuffle-lists.js";

let selectedLearningMethod = state.selectedLearningMethod;
let listData = state.listData;
let question = "";
let questions_practiced;
let lengthOfWordlist;
let currentList = [];
let currentQuestionIndex = 0;
let incorrectFull;
let incorrect2;

hide("prac-panel");

export function startPracticing(language, listName) {

    selectedLearningMethod = document.forms["set-panel__form"]["set-panel__lm-form"].value;

    listData = prepareWordlists(language, listName);

    lengthOfWordlist = listData.questions.length;
    
    currentQuestionIndex = 0;
    state.listData = listData;
    incorrectFull = 0;
    incorrect2 = 0;
    questions_practiced = 0;

    setText("prac-panel__q-count", `${lengthOfWordlist}`);

    hide("set-panel");
    hide("wl-panel");
    show("prac-panel");

    hide("prac-panel__score-txt");

    // Do different things depending on learning method
    if (selectedLearningMethod === "ARTICLE") {
        show("prac-panel__btn-le");
        show("prac-panel__btn-la");
        hide("prac-panel__txt-input");
    } else if (selectedLearningMethod === "WORDS") {
        show("prac-panel__fb-disp");
        hide("prac-panel__btn-le");
        hide("prac-panel__btn-la");
        setText("prac-panel__txt-input", " ");
    }

    question = listData.questions.shift();

    currentQuestionIndex++;

    setText("prac-panel__q-display", question);

    setText("prac-panel__fb-A", "\u00A0");
    setText("prac-panel__fb-B", "\u00A0");
}


function prepareWordlists(language, listName) {
    let listData = JSON.parse(JSON.stringify(wordLists[language][listName]));

    [listData.questions, listData.answers] = shuffleLists(listData.questions, listData.answers);

    if (selectedLearningMethod === "ARTICLE") { 
        [listData.questions, listData.answers] = leLaParsing(listData.answers);

        if (listData.questions.length === 0) {
            alert("List doesn't have any nouns");
        }
    }

    if (reverseBtnState === 1) {
        listData.questions = listData.answers;
        listData.answers = listData.questions;
    }

    return listData;
}

