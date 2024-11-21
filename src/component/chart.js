import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { cleaningDataInstance } from "../utils/datacleaning/clean";
Chart.register(...registerables, ChartDataLabels);

class ChartEmployees {
  async generateSalaryChart(monthlyData) {
    const { monthArray, totalEmployeesArray, salaryArray } = monthlyData;
    const config = {
      type: "bar",
      data: {
        labels: cleaningDataInstance.transformingMonth(monthArray),
        datasets: [
          {
            label: "Monthly Salary",
            data: salaryArray,
            borderWidth: 1,
            backgroundColor: "rgb(0,123,255)",
            borderColor: "rgb(0,123,255)", // Dark red
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            pointHoverRadius: 15,
            pointHoverBackgroundColor: "rgb(0,123,255)", // Light red
            pointHoverBorderColor: "rgb(0,123,255)", // Dark redpointHoverBorderColor,
            pointHoverBorderWidth: 0.5,
            pointRadius: 5,
            yAxisID: "salaryAxis",
            order: 1, // Set order to be drawn first

            datalabels: {
              display: function (context) {
                const value = context.dataset.data[context.dataIndex];
                if (value > 0) {
                  const formattedValue =
                    cleaningDataInstance.commaSeperator(value);
                  return formattedValue;
                }
              },
              font: {
                size: 17,
              },
              color: "white",
              anchor: "end",
              align: "start",
              offset: 25, // Adjust this value for spacing
            },
          },
          {
            type: "line",
            label: "Monthly Employee",
            data: totalEmployeesArray,
            backgroundColor: "rgba(255,75,76)", // Light red
            borderColor: "rgba(255,75,76, 1)", // Dark red            borderWidth: 1,
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            pointHoverRadius: 15,
            pointHoverBackgroundColor: "rgba(255,75,76,0.7)", // Light red
            pointHoverBorderColor: "rgba(255,75,76, 1)", // Dark red
            pointHoverBorderWidth: 0.5,
            pointRadius: 8,
            yAxisID: "employeeAxis",
            order: 0,
            datalabels: {
              display: function (context) {
                const value = context.dataset.data[context.dataIndex];
                if (value > 0) {
                  return cleaningDataInstance.commaSeperator(value);
                }
              },
              font: {
                size: 17,
              },
              anchor: "center",
              align: "bottom",
              color: "white",
              offset: 10,
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
            // label for left size
            type: "linear",
            position: "left",
            ticks: {
              display: true,
              font: { size: 16 },
              color: "white",
            },
          },
          employeeAxis: {
            display: false,
          },
          x: {
            //LABEL for jan Feb etc
            ticks: {
              color: "white", // Set the x-axis label color to white
              font: { size: 15 },
            },
          },
        },
        plugins: {
          datalabels: {
            //showing the datalabels value into commaseparator
            formatter: (value) => {
              return cleaningDataInstance.commaSeperator(value);
            },
          },
          title: {
            display: true,
            text: "Monthly Salary Released vs Monthly Employee",
            font: {
              size: 20,
              weight: "bold",
            },
            color: "white",
          },
          legend: {
            position: "top",
            align: "start",
            labels: {
              color: "white",
              font: {
                size: 16,
              },
              boxWidth: 50,
            },
          },
          tooltip: {
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 16,
            },
            footerFont: {
              size: 16, // there is no footer by default
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

  async generateEmployeesTotalChart(monthlyTotalData) {
    const { yearlyTotalRegularProbation, year } = monthlyTotalData;
    console.log(yearlyTotalRegularProbation);
    console.log(year);

    const config = {
      type: "pie",
      data: {
        labels: Object.keys(yearlyTotalRegularProbation),
        datasets: [
          {
            label: `${year} Total New Employees Type`,
            data: Object.values(yearlyTotalRegularProbation),
            backgroundColor: ["#2C99E4", "#FF6384"], // Add colors for the pie chart sections
          },
        ],
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
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `${year} Total New Employees Type`,
            font: {
              size: 20,
            },
            color: "black",
          },
          legend: {
            position: "top",
            align: "center",
            labels: {
              font: {
                size: 16,
              },
              color: "black", // Legend text color
              boxWidth: 50,
            },
          },
          datalabels: {
            color: "white", // Data labels color
            font: {
              size: 18, // Larger font size for data labels
            },
          },
          tooltip: {
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 16,
            },
            footerFont: {
              size: 16, // there is no footer by default
            },
          },
        },
      },
    };

    const existingChart = Chart.getChart("totalEmployeesChart");

    if (existingChart) existingChart.destroy();

    const totalEmployeesChart = new Chart(
      document.getElementById("totalEmployeesChart"),
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

export const chartEmployeesInstance = new ChartEmployees();
