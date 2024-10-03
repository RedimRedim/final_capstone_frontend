export class TotalEmployees {
  constructor(EmployeesInstance) {
    this.EmployeesInstance = EmployeesInstance;
  }

  async sumEmployee() {
    const data = await this.EmployeesInstance.employees;
    const monthlySalaryData = await this.EmployeesInstance.getMonthlySalary;
    const monthlyDepartmentData = await this.EmployeesInstance
      .getMonthlyDepartment;

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
      monthlyDepartmentData: monthlyDepartmentData,
    };
  }

  async updateTotalHtml() {
    const data = await this.sumEmployee();
    document.getElementById("totalEmployee").innerHTML = data.totalEmployee;
    document.getElementById("totalRegular").innerHTML = data.totalRegular;
    document.getElementById("totalProbation").innerHTML = data.totalProbation;

    // const deptTable = document.querySelector("tbody.table-content1");
    // const monthlyDepartmentData = data.monthlyDepartmentData;

    // for (let key in monthlyDepartmentData) {
    //   const deptRow = document.createElement("tr");
    //   deptRow.innerHTML = `
    //   <td>${key}</td>
    //   <td>${monthlyDepartmentData[key]}</td>`;
    //   deptTable.appendChild(deptRow);
    // }
  }
}
