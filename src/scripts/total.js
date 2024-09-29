export class TotalEmployees {
  constructor(EmployeesInstance) {
    this.EmployeesInstance = EmployeesInstance;
  }

  async sumEmployee() {
    const data = await this.EmployeesInstance.employees;
    const monthlySalaryData = await this.EmployeesInstance.getMonthlySalary;
    const totalRegular = data.employees.filter((employee) => {
      return employee.employeeType.toLowerCase().includes("regular");
    }).length;

    const totalProbation = data.employees.filter((employee) => {
      return employee.employeeType.toLowerCase().includes("probation");
    }).length;

    return {
      totalEmployee: data.employees.length,
      totalRegular: totalRegular,
      totalProbation: totalProbation,
      monthlySalaryData: monthlySalaryData,
    };
  }

  async updateTotalHtml() {
    const data = await this.sumEmployee();
    document.getElementById("totalEmployee").innerHTML = data.totalEmployee;
    document.getElementById("totalRegular").innerHTML = data.totalRegular;
    document.getElementById("totalProbation").innerHTML = data.totalProbation;
  }
}
