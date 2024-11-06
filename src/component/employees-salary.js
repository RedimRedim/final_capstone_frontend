class EmployeesSalary {
  constructor() {}

  async calculateTimekeepingApi(file) {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });

        console.log(response);
        const result = await response.json();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please select a file before uploading");
    }
  }

  async updateSalaryTableBody() {
    let salaryTableHtml = [];
    this.calculateSalaryData.forEach((data) => {
      salaryTableHtml.push(
        `
        <tr>
        <td data-uuid="${data.uuid}">${data.uuid}</td>
        <td data-name="${data.name}">${data.name}</td>
        <td data-sex="${data.sex}">${data.sex}</td>
        <td data-department="${data.department}">${data.department}</td>
        <td data-employee-type="${data.employeeType}">${data.employeeType}</td>
        <td data-role="${data.role}">${data.role}</td>
        <td data-required-workdays="${data.requiredWorkDays}">${data.requiredWorkDays}</td>
        <td data-required-restdays="${data.requiredRestDays}">${data.requiredRestDays}</td>
        <td data-basic-salary="${data.basicSalary}">${data.basicSalary}</td>
        <td data-daily-salary="${data.dailySalary}">${data.dailySalary}</td>
        <td data-day-off="${data.dayOff}">${data.dayOff}</td>
        <td data-finished-work="${data.finishedWork}">${data.finishedWork}</td>
        <td data-late="${data.late}">${data.late}</td>
        <td data-absent="${data.absent}">${data.absent}</td>
        <td data-base-salary="${data.baseSalary}">${data.baseSalary}</td>
        <td data-late-deduction="${data.lateDeduction}">${data.lateDeduction}</td>
        <td data-absent-deduction="${data.absentDeduction}">${data.absentDeduction}</td>
        <td data-total-released-salary="${data.totalReleasedSalary}">${data.totalReleasedSalary}</td>
        </tr>
        `
      );
    });

    document.getElementById("salaryTableBody").innerHTML =
      salaryTableHtml.join("");
  }
}

export const employeesSalaryInstance = new EmployeesSalary();
