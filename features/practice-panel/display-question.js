import store from "../../app/store.js";
import { setText, setColor } from "../../utils/show-hide.js";
import { endPractice } from "./end-practice.js";
import { speakText } from "../../utils/speak-text.js";
import { wlFilePaths } from "../../database/wl-file-paths.js";

export function displayQuestion() {
    console.log(store.state.listData)
    if (store.state.listData.questions.length === 0) {
        endPractice();
        return
    }

    setText("prac-panel__q-count", `${store.state.listData.questions.length}`);

    setColor("prac-panel__fb-disp", "var(--darkgrey)", "var(--lightgrey)", "var(--darkgrey)");

    store.state.practicedQuestions++;

    setText("prac-panel__q-display", store.state.listData.questions[0]);
    setText("prac-panel__fb-A", "\u00A0");
    setText("prac-panel__fb-B", "\u00A0");

    if (store.state.selectedLearningMethod === "WORDS") {
        setText("prac-panel__txt-input", "");
    }
    console.log(store.state.reverseBtnState)
    if (store.state.reverseBtnState === 1) {
        speakText(store.state.listData.questions[0], wlFilePaths[store.state.selWordlistGroup][0][0]); 
    }

    store.state.practiceState = "ANSWERING";
}