import { state } from "../../app/state.js";
import { setText, setColor } from "../../utils/show-hide.js";
import { speakText } from "../../utils/speak-text.js";
import { wordLists } from "../../database/word-lists.js";
import { levenshtein } from "../../utils/levenshtein.js";

let selectedLearningMethod = state.selectedLearningMethod;
let reverseBtnState = state.reverseBtnState;
let countQuestionsAnswered;
let userAnswer;
let correctAnswer;
let question;

export function checkAnswer() {

    state.practiceState = "CHECKING";

    countQuestionsAnswered++;

    correctAnswer = state.listData.answers.shift();
    question = state.listData.questions.shift();
    state.currentQuestion = question;

    if (selectedLearningMethod === "WORDS") {
        // Get the answer from the textfield and get the correct answer
        userAnswer = document.getElementById("prac-panel__txt-input").value.trim();  
        // Speak the correct answer
        if (reverseBtnState === 0) {
            speakText(correctAnswer, wordLists[state.selWordlistGroup].settings[0]); 
        }
    } else if (selectedLearningMethod === "ARTICLE") {
        // Get the lela buttons state
        console.log("button state le la: ", lelaBtnState)
        userAnswer = lelaBtnState;
    }

    verifyAnwser();
    console.log(state.listData)
}

function verifyAnwser() {

    console.log("User Answer:", userAnswer)
    console.log("Correct Answer:", correctAnswer)

    if (userAnswer === correctAnswer) {
        setColor("prac-panel__fb-disp", "var(--darkgreen)", "var(--green)", "var(--darkgreen)");
        document.getElementById(`prac-panel__fb-A`).innerText = "Correct!";
        return;
    }

    let checks = levenshtein(userAnswer, correctAnswer);
    if ((checks <= 3 && correctAnswer.length > 4)) {

        setColor("prac-panel__fb-disp", "var(--darkgreen)", "var(--green)", "var(--darkgreen)");
        setText("prac-panel__fb-A", "Check spelling!");
        setText("prac-panel__fb-B", `Correctly spelled answer: ${correctAnswer}`);
        return;
    }

    setColor("prac-panel__fb-disp", "var(--darkred)", "var(--red)", "var(--darkred)");

    setText("prac-panel__fb-A", "Falsch!");
    setText("prac-panel__fb-B", `Die richtige Antwort ist: ${correctAnswer}`);
    console.log(state.listData)
        console.log("o")
    console.log(question)
    console.log(correctAnswer)
    state.listData.questions.push(question);
    state.listData.answers.push(correctAnswer);

    console.log(state.listData)
    state.countMistakes++;   
}