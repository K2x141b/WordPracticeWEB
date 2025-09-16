import store from "../../app/store.js";
import { show, hide, setText } from "../../utils/show-hide.js";
import { shuffleLists } from "../../utils/shuffle-lists.js";
import { leLaParsing } from "../settings-panel/lelabutton.js";
import { displayQuestion } from "./display-question.js";

let question = "";

hide("prac-panel");

export async function startPracticing(selWordlistGroup, listName) {
    store.state.selWordlistGroup = selWordlistGroup;
    store.state.currentListName = listName;

    store.state.selectedLearningMethod = document.forms["set-panel__form"]["set-panel__lm-form"].value;

    const resp = await fetch(`../../database/${selWordlistGroup}/${listName}.json`);
    const data = await resp.json();

    store.state.listData = data;

    prepareWordlists(selWordlistGroup, listName);

    store.state.wrongAnswers = 0;
    store.state.practicedQuestions = 0;

    prepareUI();

    displayQuestion();
}

function prepareWordlists() {
    [store.state.listData.questions, store.state.listData.answers] = shuffleLists(store.state.listData.questions, store.state.listData.answers);

    if (store.state.selectedLearningMethod === "ARTICLE") { 
        [store.state.listData.questions, store.state.listData.answers] = leLaParsing(store.state.listData.answers);

        if (listData.questions.length === 0) {
            alert("List doesn't have any nouns");
        }
    }

    if (store.state.reverseBtnState === 1) {
        let tempList = store.state.listData.answers;
        store.state.listData.answers = store.state.listData.questions;
        store.state.listData.questions = tempList;
    }
}

function prepareUI() {
    hide("set-panel");
    hide("wl-panel");
    show("prac-panel");

    hide("prac-panel__score-txt");

    if (store.state.selectedLearningMethod === "ARTICLE") {
        show("prac-panel__btn-le");
        show("prac-panel__btn-la");
        hide("prac-panel__txt-input");
    } else if (store.state.selectedLearningMethod === "WORDS") {
        show("prac-panel__fb-disp");
        hide("prac-panel__btn-le");
        hide("prac-panel__btn-la");
        setText("prac-panel__txt-input", " ");
    }

    setText("prac-panel__q-count", `${store.state.lengthOfWordlist}`);
    setText("prac-panel__q-display", question);
    setText("prac-panel__fb-A", "\u00A0");
    setText("prac-panel__fb-B", "\u00A0");
}