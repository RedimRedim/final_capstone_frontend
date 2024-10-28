import { Employees } from "./employees-api";
import { CleaningData } from "../utils/datacleaning/clean";

export class TotalEmployees extends Employees {
  constructor(chartEmployeesInstance) {
    super();
    this.chartEmployeesInstance = chartEmployeesInstance; //chartEmployees instance
    this._monthlySalaryData = null;
    this.cleaningData = new CleaningData();
  }

  async updateTotalHtml(year, month) {
    const data = await this.getMonthlySalary();
    const deptData = await this.getMonthlyDepartment(year, month);
    this._monthlySalaryData = data; //save data
    let monthDataResult = [];
    data.forEach((data) => {
      if (data.month == month && data.year == year) {
        monthDataResult = {
          month: data.month,
          totalProbation: data.totalProbation,
          totalSalary: data.totalSalary,
          totalRegular: data.totalRegular,
          totalEmployees: data.totalEmployees,
          totalFemale: data.totalFemale,
          totalMale: data.totalMale,
        };
      }
    });

    console.log(year, month);

    //DepartmentData no need to check data.month & data.year
    monthDataResult.departmentData =
      this.cleaningData.monthlyDepartmentDataHtml({
        deptData,
        month,
        year: year,
      });

    this.renderTotalHtml(monthDataResult);
  }

  async updateChartHtml(year) {
    const monthlyData = this.cleaningData.yearlyChartData({
      data: this._monthlySalaryData,
      year,
    });
    await this.chartEmployeesInstance.generateSalaryChart(monthlyData);
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
    document.getElementById("tableDepartmentBody").innerHTML =
      monthDataResult.departmentData;
  }
}
