const store = {
    state: {
        practiceState: "ANSWERING",
        selectedLearningMethod: "WORDS",
        reverseBtnState: 0,
        selWordlistGroup: "",
        listData: { questions: [], answers: [], },
        countIncorrectAnswers: 0,
        countMistakes: 0,
        practicedQuestions: 0,
        currentQuestion: ""
    },
    listeners: [],
}

export default store;