import { Employees } from "./employees.js";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

let dataTableInstance; // Variable to hold the DataTable instance
const EmployeesClass = new Employees();

const form = document.getElementById("createEmpForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  EmployeesClass.postEmployee(data);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("asd");
  updateEmpTableBody();
});

async function updateEmpTableBody() {
  const empData = await EmployeesClass.getEmployees();
  let empTableHtml = [];
  empData.forEach((data) => {
    empTableHtml.push(`<tr>
          <td>${data._id}</td>
          <td>${data.name}</td>
          <td>${data.sex}</td>
          <td>${data.department}</td>
          <td>${data.employeeType}</td>
          <td>${data.role}</td>
          <td>${JSON.stringify(data.salary)}</td>
          <td>${data.isResign}</td>
          <td>${data.createdDate}</td>
          <td>${data.updatedDate}</td>
          </tr>
          `);
  });

  document.getElementById("empTableBody").innerHTML = empTableHtml.join("");

  // Initialize DataTable after updating the table body
  if (!dataTableInstance) {
    dataTableInstance = new DataTable("#payrollTable", {
      responsive: true,
    }); // Initialize only once
  } else {
    dataTableInstance.clear(); // Clear previous data
    dataTableInstance.rows.add(empData); // Add new data
    dataTableInstance.draw(); // Re-draw the DataTable with updated data
  }
}
