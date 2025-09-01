import { setText } from "../../utils/show-hide.js";

export function nextQuestion() {

    setText("prac-panel__q-count", "${currentList.questions.length}");

    // Change the answer-display back to gray colors
    let element = document.getElementById(`prac-panel__fb-disp`);
    element.style.color = "var(--darkgrey)";
    element.style.backgroundColor = "var(--lightgrey)";
    element.style.borderColor = "var(--darkgrey)";

    switch_x = 0;  // Reset to allow new answer checking

    // Check if the list is empty
    if (currentList.questions.length === 0) {
        endPractice();
        return
    }

    question = currentList.questions.shift();
    currentQuestionIndex++;

    setText("prac-panel__q-display", question);
    setText("prac-panel__fb-A", "\u00A0");
    setText("prac-panel__fb-B", "\u00A0");

    // Do different things depending on learning method
    if (learning_method == 1) {
        setText("prac-panel__txt-input", "");
    }

    // Speak the question if doing the list the opposite way
    if (reverse === 1) {
        speakText(question, wordLists[active_language].settings[0]); 
    }
}