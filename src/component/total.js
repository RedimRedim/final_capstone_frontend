import { Employees } from "./employees-api";
import { CleaningData } from "../utils/datacleaning/clean";

export class TotalEmployees extends Employees {
  constructor() {
    super();
    this._monthlySalaryData = null; // Initialize here
    this._monthlyDeptData = null;
    this.cleaningData = new CleaningData();
  }

  get monthSalaryData() {
    console.log(this._monthSalaryData);
    return this._monthlySalaryData; // Getter for accessing the data
  }

  async updateTotalHtml(year, month) {
    this._monthlyDeptData = "cc";
    const data = await this.getMonthlySalary();
    const deptData = await this.getMonthlyDepartment();
    this._monthlySalaryData = data; //save data
    this._monthlyDeptData = deptData; //save data
    console.log(this._monthlySalaryData);
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
          departmentData: this.cleaningData.monthlyDepartmentDataHtml({
            deptData,
            month,
            year: year,
          }),
        };
        this.renderTotalHtml(monthDataResult);
      }
    });
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
