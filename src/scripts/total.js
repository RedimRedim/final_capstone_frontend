export class TotalEmployees {
  constructor(EmployeesInstance) {
    this.EmployeesInstance = EmployeesInstance;
  }

  async sumEmployee() {
    const data = await this.EmployeesInstance.employees;

    const totalRegular = data.employees.filter((employee) => {
      return employee.employeeType.toLowerCase().includes("regular");
    }).length;

    const totalProbation = data.employees.filter((employee) => {
      return employee.employeeType.toLowerCase().includes("probation");
    }).length;

    const salaryMapping = data.employees.map((employee) => {
      return employee.salary;
    });

    console.log(salaryMapping);

    return {
      totalEmployee: data.employees.length,
      totalRegular: totalRegular,
      totalProbation: totalProbation,
    };
  }

  async updateTotalHtml() {
    const data = await this.sumEmployee();
    document.getElementById("totalEmployee").innerHTML = data.totalEmployee;
    document.getElementById("totalRegular").innerHTML = data.totalRegular;
    document.getElementById("totalProbation").innerHTML = data.totalProbation;
  }
}
