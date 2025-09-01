import { hide } from "../../utils/show-hide.js";

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
                            ['fully correct', (start_active_list_size) - (incorrect2 + incorrectFull)],
                            ["1 time wrong", incorrect2],
                            ["2 times or more wrong", incorrectFull],
                            ];
        drawChart(chartArray);
    });
}