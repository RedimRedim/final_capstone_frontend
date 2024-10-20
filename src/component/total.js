import { Employees } from "./employees";

export class TotalEmployees extends Employees {
  constructor() {
    super();
  }

  async updateTotalHtml(month) {
    const data = await this.getMonthlySalary();

    let monthDataResult = [];
    data.forEach((data) => {
      if (data.month == month && data.year == "2024") {
        console.log(data.month);
        console.log(data.year);

        let departmentTableHtml = [];

        for (let department in data.departments) {
          departmentTableHtml.push(`<tr>
          <td>${department}</td>
          <td>${data.departments[department]}</td>
          </tr>
          `);
        }

        monthDataResult = {
          month: data.month,
          totalProbation: data.totalProbation,
          totalSalary: data.salary,
          totalRegular: data.totalRegular,
          totalEmployees: data.totalEmployees,
          totalFemale: data.totalFemale,
          totalMale: data.totalMale,
          departmentHtml: departmentTableHtml.join(""),
        };

        this.renderTotalHtml(monthDataResult);

        this.renderChartTotal();
      }
    });
  }

  async renderChartTotal() {
    const monthlyData = await this.getMonthlySalary();
    const monthArray = monthlyData.map((item) => item.month);
    const totalEmployeesArray = monthlyData.map((item) => item.totalEmployees);
    const salaryArray = monthlyData.map((item) => item.totalSalary);

    return { monthArray, totalEmployeesArray, salaryArray };
  }

  async renderTotalHtml(monthDataResult) {
    document.getElementById("totalEmployee").innerHTML =
      monthDataResult.totalEmployees;
    document.getElementById("totalSalary").innerHTML =
      monthDataResult.totalSalary;
    document.getElementById("totalRegular").innerHTML =
      monthDataResult.totalRegular;
    document.getElementById("totalProbation").innerHTML =
      monthDataResult.totalProbation;
    document.getElementById("totalMale").innerHTML = monthDataResult.totalMale;
    document.getElementById("totalFemale").innerHTML =
      monthDataResult.totalFemale;
    document.querySelector(".table-content1body").innerHTML =
      monthDataResult.departmentHtml;
  }
}
