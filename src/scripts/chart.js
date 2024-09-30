import { Chart, registerables } from "chart.js";
import { Employees } from "./employees";
Chart.register(...registerables);

export class ChartEmployees {
  constructor(TotalEmployeeInstance) {
    this.TotalEmployeeInstance = TotalEmployeeInstance;
  }

  async salaryChart() {
    const { monthlySalaryData } =
      await this.TotalEmployeeInstance.sumEmployee();
    const labels = Object.keys(monthlySalaryData);
    const values = Object.values(monthlySalaryData);

    const config = {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Monthly Salary",
            data: values,
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
          },
          {
            type: "line",
            label: "Monthly Employee",
            data: [50, 70, 80, 90, 100, 110, 120, 150, 135],
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
          },
        ],
      },
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
            font: {
              size: 16,
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
