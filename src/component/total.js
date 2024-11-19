import { cleaningDataInstance } from "../utils/datacleaning/clean";
import { chartEmployeesInstance } from "./chart";
import { employeesApiInstance } from "./employees-api";

export class TotalEmployees {
  constructor() {
    this.monthlyTotalData = null;
    this.monthlyTotalData = null;
    this.yearlyEmployeeTypeData = null;
    this.chartEmployeesInstance = chartEmployeesInstance;
    this.cleaningData = cleaningDataInstance;
    this.employeesApiInstance = employeesApiInstance;
  }

  async updateTotalHtml(year, month) {
    this.monthlyTotalData =
      await this.employeesApiInstance.getMonthlyEmployeesTotal();
    const deptData = await this.employeesApiInstance.getMonthlyDepartment();

    let monthDataResult = [];
    this.monthlyTotalData.forEach((data) => {
      if (data.month == month && data.year == year) {
        monthDataResult = {
          month: data.month,
          totalProbation: data.totalProbation,
          avgBasicSalary: data.avgBasicSalary,
          totalRegular: data.totalRegular,
          totalEmployees: data.totalEmployees,
          totalFemale: data.totalFemale,
          totalMale: data.totalMale,
        };
      }
    });

    monthDataResult.departmentData =
      this.cleaningData.monthlyDepartmentDataHtml({
        deptData,
        month: month,
        year: year,
      });

    this.renderTotalHtml(monthDataResult);
  }

  async updateChartHtml(year) {
    this.monthlySalaryData =
      await this.employeesApiInstance.getMonthlySalaryData();

    this.monthlySalaryData = this.cleaningData.yearlyChartData({
      data: this.monthlySalaryData,
      year,
    });

    await this.chartEmployeesInstance.generateSalaryChart(
      this.monthlySalaryData
    );

    this.yearlyEmployeeTypeData = this.cleaningData.yearlyEmployeeTotalData({
      data: this.monthlyTotalData,
      year,
    });

    await this.chartEmployeesInstance.generateEmployeesTotalChart(
      this.yearlyEmployeeTypeData
    );
  }

  async renderTotalHtml(monthDataResult) {
    document.getElementById("totalEmployee").innerHTML =
      monthDataResult.totalEmployees;
    document.getElementById("avgBasicSalary").innerHTML =
      monthDataResult.avgBasicSalary;
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
