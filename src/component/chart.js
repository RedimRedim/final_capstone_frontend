import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables, ChartDataLabels);

export class ChartEmployees {
  async generateSalaryChart(monthlyData) {
    const { monthArray, totalEmployeesArray, salaryArray } = monthlyData;

    console.log(monthArray, totalEmployeesArray, salaryArray);
    const config = {
      type: "bar",
      data: {
        labels: monthArray,
        datasets: [
          {
            label: "Monthly Salary",
            data: salaryArray,
            borderWidth: 1,
            backgroundColor: "rgba(44,153,228, 0.5)",
            borderColor: "rgba(44,153,228, 1)", // Dark red
            pointBackgroundColor: "gray",
            pointBorderColor: "gray",
            pointHoverRadius: 15,
            pointHoverBackgroundColor: "rgba(44,153,228, 0.5)", // Light red
            pointHoverBorderColor: "rgba(44,153,228, 1)", // Dark redpointHoverBorderColor,
            pointHoverBorderWidth: 0.5,
            pointRadius: 5,
            yAxisID: "salaryAxis",
            order: 1, // Set order to be drawn first
            datalabels: {
              display: function (context) {
                return context.dataset.data[context.dataIndex] > 0;
              },
              font: {
                weight: "bold",
                size: 15,
              },
              color: "black",
              anchor: "end",
              align: "center",
              offset: 5, // Adjust this value for spacing
            },
          },
          {
            type: "line",
            label: "Monthly Employee",
            data: totalEmployeesArray,
            backgroundColor: "rgba(255, 99, 132, 0.5)", // Light red
            borderColor: "rgba(255, 99, 132, 1)", // Dark red            borderWidth: 1,
            pointBackgroundColor: "gray",
            pointBorderColor: "gray",
            pointHoverRadius: 15,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 0.5)", // Light red
            pointHoverBorderColor: "rgba(255, 99, 132, 1)", // Dark red
            pointHoverBorderWidth: 0.5,
            pointRadius: 8,
            yAxisID: "employeeAxis",
            order: 0,
            datalabels: {
              display: function (context) {
                return context.dataset.data[context.dataIndex] > 0;
              },
              font: {
                weight: "bold",
                size: 15,
              },
              color: "black",
              anchor: "center",
              align: "bottom",
              offset: 5,
            },
          },
        ],
      },
      plugins: [
        ChartDataLabels,
        {
          id: "background-color",
          beforedraw: (chart) => {
            const ctx = chart.canvas.getContext("2d");
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
          },
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          salaryAxis: {
            type: "linear",
            position: "left",
            ticks: {
              display: true,
              font: { size: 16 },
            },
          },
          employeeAxis: {
            display: false,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Monthly Salary vs Monthly Employee Released",
            font: {
              size: 20,
              weight: "bold",
            },
            color: "black",
          },
          legend: {
            position: "top",
            align: "start",
            labels: {
              font: {
                size: 16,
              },
              boxWidth: 50,
            },
          },
        },
      },
    };

    const existingChart = Chart.getChart("salaryChart");

    if (existingChart) existingChart.destroy();

    const salaryChart = new Chart(
      document.getElementById("salaryChart"),
      config
    );

    // const containerBody = document.querySelector(".chart-content1");
    // const chartLabelsLength = salaryChart.data.labels.length;

    // if (chartLabelsLength > 7) {
    //   const newWidth = 700 + (chartLabelsLength - 7) * 30;
    //   containerBody.style.width = `${newWidth}px`;
    // }
  }
}
