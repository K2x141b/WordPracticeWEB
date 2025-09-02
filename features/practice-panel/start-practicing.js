import { state } from "../../app/state.js";
import { wordLists } from "../../database/word-lists.js";
import { reverseBtnState } from "../settings-panel/reverse-btn.js";
import { show, hide, setText } from "../../utils/show-hide.js";
import { shuffleLists } from "../../utils/shuffle-lists.js";
import { leLaParsing } from "../settings-panel/lelabutton.js";

let question = "";
let lengthOfWordlist;

hide("prac-panel");

export function startPracticing(selWordlistGroup, listName) {

    state.selWordlistGroup = selWordlistGroup;
    state.currentListName = listName;

    state.selectedLearningMethod = document.forms["set-panel__form"]["set-panel__lm-form"].value;

    state.listData = prepareWordlists(selWordlistGroup, listName);

    lengthOfWordlist = state.listData.questions.length;

    state.wrongAnswers = 0;
    state.practicedQuestions = 0;

    question = state.listData.questions[0];
    state.currentQuestion = question;

    state.practicedQuestions = 0;
    state.practicedQuestions++;

    prepareUI();
}


function prepareWordlists(selWordlistGroup, listName) {
    let listData = JSON.parse(JSON.stringify(wordLists[selWordlistGroup][listName]));
    
    [listData.questions, listData.answers] = shuffleLists(listData.questions, listData.answers);

    if (state.selectedLearningMethod === "ARTICLE") { 
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

function prepareUI() {
    hide("set-panel");
    hide("wl-panel");
    show("prac-panel");

    hide("prac-panel__score-txt");

    if (state.selectedLearningMethod === "ARTICLE") {
        show("prac-panel__btn-le");
        show("prac-panel__btn-la");
        hide("prac-panel__txt-input");
    } else if (state.selectedLearningMethod === "WORDS") {
        show("prac-panel__fb-disp");
        hide("prac-panel__btn-le");
        hide("prac-panel__btn-la");
        setText("prac-panel__txt-input", " ");
    }

    setText("prac-panel__q-count", `${lengthOfWordlist}`);
    setText("prac-panel__q-display", question);
    setText("prac-panel__fb-A", "\u00A0");
    setText("prac-panel__fb-B", "\u00A0");
}