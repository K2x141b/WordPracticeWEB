import { state } from "../../app/state.js";
import { setText, setColor } from "../../utils/show-hide.js";
import { endPractice } from "./end-practice.js";

export function nextQuestion() {

    setText("prac-panel__q-count", `${state.listData.questions.length}`);

    setColor("prac-panel__fb-disp", "var(--darkgrey)", "var(--lightgrey)", "var(--darkgrey)");

    if (state.listData.questions.length === 0) {
        endPractice();
        return
    }

    state.practicedQuestions++;

    setText("prac-panel__q-display", state.listData.questions[0]);
    setText("prac-panel__fb-A", "\u00A0");
    setText("prac-panel__fb-B", "\u00A0");

    if (state.selectedLearningMethod === "WORDS") {
        setText("prac-panel__txt-input", "");
    }

    if (state.reverseBtnState === 1) {
        speakText(state.listData.questions[0], wordLists[state.selWordlistGroup].settings[0]); 
    }

    state.practiceState = "ANSWERING";
}