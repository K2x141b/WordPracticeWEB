import store from "../../app/store.js";

import { checkAnswer } from "../practice-panel/check-anwser.js";
import { displayQuestion } from "../practice-panel/display-question.js";

import { leLaButton } from "../settings-panel/lelabutton.js";

document.addEventListener('keydown', function(event) {eventKey(event);});

let sequence = "";

function eventKey(event) {
    if (event.key === 'Enter') {
        sequence = "";

        if (store.state.practiceState === "ANSWERING") {
            checkAnswer();
            return
        }

        if (!store.state.practiceState === "CHECKING") return;

        displayQuestion();

        if (store.state.selectedLearningMethod === 2) {
            document.getElementById("prac-panel__btn-le").classList.remove("button-active")
            document.getElementById("prac-panel__btn-la").classList.remove("button-active")
        }

        return
    }

    if (event.key.length === 1) {
        sequence += event.key;

        if (sequence === "le") {
            leLaButton("le");
            sequence = "";
        } else if (sequence === "la") {
            leLaButton("la");
            sequence = "";
        }
        return
    }
    
    if (event.key === 'Backspace'){
        sequence = sequence.slice(0, -1);;
    }
}