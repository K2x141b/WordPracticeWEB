import { state } from "../../app/state.js";

import { setText, setColor } from "../../utils/show-hide.js";

let selectedLearningMethod = state.selectedLearningMethod;
let practiceState = state.practiceState;
let listData = state.listData;

let countQuestionsAnswered;
let userAnswer;
let correctAnswer;
let countMistakes;

export function checkAnswer() {
    countQuestionsAnswered++;
    console.log(listData)
    correctAnswer = listData.answers.shift();

    if (selectedLearningMethod === "WORDS") {
        // Get the answer from the textfield and get the correct answer
        userAnswer = document.getElementById("prac-panel__txt-input").value.trim();  
        // Speak the correct answer
        if (reverse === 0) {
            speakText(correctAnswer, wordLists[active_language].settings[0]); 
        }
    } else if (selectedLearningMethod === "ARTICLE") {
        // Get the lela buttons state
        console.log("button state le la: ", button_state_lela)
        userAnswer = button_state_lela;
    }

    practiceState = "CHECKING";  // Set to wait for user input before moving to the next question

    verifyAnwser();
    
    // Initialize the element to be the answer-display
    let element = document.getElementById(`prac-panel__fb-disp`);

    // Change the answer-display to red (answer wrong)
    element.style.color = "var(--darkred)"; 
    element.style.backgroundColor = "var(--red)"; 
    element.style.borderColor = "var(--darkred)"; 

    // show the feedback on the answer display
    document.getElementById(`prac-panel__fb-A`).innerText = `Falsch!`;
    document.getElementById(`prac-panel__fb-B`).innerText = `Die richtige Antwort ist: ${correctAnswer}`;

    // add the wrong question to the currentList so that you can practice it again
    currentList.questions.push(question);
    currentList.answers.push(correctAnswer);
}

function verifyAnwser() {

    if (userAnswer === correctAnswer) {
        setColor(element, "var(--darkgreen)", "var(--green)", "var(--darkgreen)");
        document.getElementById(`prac-panel__fb-A`).innerText = "Correct!";
        return;
    }

    let checks = levenshtein(userAnswer, correctAnswer);
    if ((checks <= 3 && correctAnswer.length > 4)) {

        setColor(element, "var(--darkgreen)", "var(--green)", "var(--darkgreen)");
        setText("prac-panel__fb-A", "Check spelling!");
        setText("prac-panel__fb-B", "Correctly spelled answer: ${correctAnswer}");
        return;
    }

    countMistakes++;
    
}