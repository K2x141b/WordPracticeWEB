import { hide, show } from "../../utils/show-hide.js";
import { state } from "../../app/state.js";
import { drawChart } from "./utils/draw-chart.js";

export function endPractice() {
    // Make space for the accuracy chart
    hide("prac-panel__q-count");
    hide("prac-panel__q-display");
    hide("prac-panel__txt-input");
    hide("prac-panel__btn-le");
    hide("prac-panel__btn-la");
    hide("prac-panel__fb-disp");
    
    show("prac-panel__score-disp");

    // Display the Accuracy Chart
    google.charts.load('current',{packages:['corechart']});
    google.charts.setOnLoadCallback(function() {
        const chartArray = [['Type', 'Count'], 
                            ['Richtig:', (state.practicedQuestions) - (state.countIncorrectAnswers)],
                            ["Falsch", state.countIncorrectAnswers],
                            ];
        drawChart(chartArray);
    });
}