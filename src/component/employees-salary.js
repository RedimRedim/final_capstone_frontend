const API_URL = "https://finalcapstonebackendpython-production.up.railway.app";
import { cleaningDataInstance } from "../utils/datacleaning/clean";

class EmployeesSalary {
  constructor() {
    this.formattedData;
  }

  async salaryTableListener() {
    document
      .getElementById("salarySubmitBtn")
      .addEventListener("click", async () => {
        const year = document.querySelector("#yearSelectSalary").value;
        const month = document.querySelector("#monthSelectSalary").value;
        const result = await this.getMonthlySalaryApi({ year, month });
        this.formattedData =
          cleaningDataInstance.transformingSalaryData(result);
        this.updateSalaryTableBody(result);
      });
  }

  async timekeepingTableListener() {
    document
      .getElementById("uploadTimekeepingForm")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        const fileInput = document.getElementById("fileTimekeeping");
        const file = fileInput.files[0];
        const formData = new FormData();

        const timekeepingYear = document.querySelector(
          "#yearSelectTimekeeping"
        ).value;
        const timekeepingMonth = document.querySelector(
          "#monthSelectTimekeeping"
        ).value;

        formData.append("timekeepingYear", timekeepingYear);
        formData.append("timekeepingMonth", timekeepingMonth);
        formData.append("file", file);
        const result = await this.calculateTimekeepingApi(formData);

        if (result) {
          console.log(result);
        }
      });
  }

  async calculateTimekeepingApi(formData) {
    if (formData) {
      try {
        console.log();
        const response = await fetch(`${API_URL}/upload`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          return result.data;
        } else {
          throw new Error(` ${result.error}`);
        }
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please select a file before uploading");
    }
  }

  async getMonthlySalaryApi({ year, month }) {
    try {
      const params = new URLSearchParams({
        year: year.toString(),
        month: month.toString(),
      });

      const response = await fetch(`/api/salary?${params.toString()}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.log(error);
      alert("Error fetching monthly salary data", error);
    }
  }

  async updateSalaryTableBody(result) {
    let salaryTableHtml = [];
    if (!result.length > 0)
      return (document.getElementById("salaryTableBody").innerHTML = "No Data");
    result.forEach((data) => {
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

  initListener() {
    this.timekeepingTableListener();
    this.salaryTableListener();
  }
}

export const employeesSalaryInstance = new EmployeesSalary();
