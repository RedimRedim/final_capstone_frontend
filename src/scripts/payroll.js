import { Employees } from "./employees.js";
const EmployeesClass = new Employees();

const form = document.getElementById("createEmpForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  EmployeesClass.postEmployee(data);
});
