import { cleaningDataInstance } from "../utils/datacleaning/clean";
import { chartEmployeesInstance } from "./chart";
import { employeesInstance } from "./employees-api";

export class TotalEmployees {
  constructor() {
    this.monthlySalaryData = null;
    this.chartEmployeesInstance = chartEmployeesInstance;
    this.cleaningData = cleaningDataInstance;
    this.employeesInstance = employeesInstance;
  }

  async updateTotalHtml(year, month) {
    this.monthlySalaryData = await this.employeesInstance.getMonthlySalary();
    const deptData = await this.employeesInstance.getMonthlyDepartment(
      year,
      month
    );
    let monthDataResult = [];
    this.monthlySalaryData.forEach((data) => {
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
      data: this.monthlySalaryData,
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
