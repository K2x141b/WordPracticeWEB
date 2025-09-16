const vw = window.innerWidth;
const vh = window.innerHeight;

export function drawChart(data_raw) {
    // Set Data
    const data = google.visualization.arrayToDataTable(data_raw);
    let color_of_chart = getComputedStyle(document.documentElement).getPropertyValue('--grey');
    // Set Options
    const options = {
        width: (80 / 100) * vw,
        height: (60 / 100) * vh,
        backgroundColor: color_of_chart,
        colors: ['rgb(86, 157, 63)', 'rgb(168, 117, 74)', 'rgb(142, 78, 57)'],
        is3D: true,
        enableInteractivity: false,
        pieSliceTextStyle: {
            color: "rgb(98, 98, 98)", // Change this to your desired color
            fontSize: 20, // Optional: Change font size
            bold: true, // Make text bold
          },
    };
    
    // Draw
    const chart = new google.visualization.PieChart(document.getElementById('prac-panel__score-chart'));
    chart.draw(data, options);
}