import store from '../../app/store.js';
import { setText, setColor } from '../../utils/show-hide.js';
import { speakText } from '../../utils/speak-text.js';
import { wlFilePaths } from '../../database/wl-file-paths.js';
import { levenshtein } from '../../utils/levenshtein.js';

let selectedLearningMethod = store.state.selectedLearningMethod;
let reverseBtnState = store.state.reverseBtnState;
let countQuestionsAnswered;
let userAnswer;
let answer;
let question;

export function checkAnswer() {

    store.state.practiceState = 'CHECKING';

    countQuestionsAnswered++;

    answer = store.state.listData.answers.shift();
    question = store.state.listData.questions.shift();
    store.state.currentQuestion = question;

    if (selectedLearningMethod === 'WORDS') {
        // Get the answer from the textfield and get the correct answer
        userAnswer = document.getElementById('prac-panel__txt-input').value.trim();  
        // Speak the correct answer
        if (store.state.reverseBtnState === 0) {
            speakText(answer, wlFilePaths[store.state.selWordlistGroup][0]); 
        }
    } else if (selectedLearningMethod === 'ARTICLE') {
        userAnswer = lelaBtnState;
    }

    verifyAnwser();
}

function verifyAnwser() {

    if (userAnswer === answer) {
        setColor('prac-panel__fb-disp', 'var(--darkgreen)', 'var(--green)', 'var(--darkgreen)');
        setText('prac-panel__fb-A', 'Correct!');
        return;
    }

    let checks = levenshtein(userAnswer, answer);
    if ((checks <= 0 && answer.length > 4)) {

        setColor('prac-panel__fb-disp', 'var(--darkgreen)', 'var(--green)', 'var(--darkgreen)');
        setText('prac-panel__fb-A', 'Check spelling!');
        setText('prac-panel__fb-B', `Correctly spelled answer: ${answer}`);
        return;
    }

    setColor('prac-panel__fb-disp', 'var(--darkred)', 'var(--red)', 'var(--darkred)');

    setText('prac-panel__fb-A', 'Falsch!');
    setText('prac-panel__fb-B', `Die richtige Antwort ist: ${answer}`);

    store.state.listData.questions.push(question);
    store.state.listData.answers.push(answer);

    store.state.countMistakes++;   
}