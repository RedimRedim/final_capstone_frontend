import { Employees } from "../component/employees-api";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
let dataTableInstance;

export const payroll = {
  employees: new Employees(),

  render() {
    return `<div class="row m-2">

                <form id="createEmpForm">
                    <div class="emp-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>

                    <div class="emp-group">
                        <label for="sex">Sex</label>
                        <input type="radio" name="sex" id="female" value="Female">
                        <label for="female">Female</label>
                        <input type="radio" name="sex" id="male" value="Male">
                        <label for="male">Male</label>
                    </div>

                    <div class="emp-group">
                        <label for="department">Department</label>
                        <select id="department" name="department" required>
                            <option value="">Select Department</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="IT">IT</option>
                        </select>

                        <div class="emp-group">
                            <label for="employeeType">Employee Type</label>
                            <select id="employeeType" name="employeeType" required>
                                <option value="">Select Employee Type</option>
                                <option value="Regular">Regular</option>
                                <option value="Probation">Probation</option>
                            </select>
                        </div>

                        <div class="emp-group">
                            <label for="role">Role</label>
                            <input type="text" id="role" name="role" required>
                        </div>

                        <input type="submit" id="saveEmp" class="btn btn-primary" value="Submit">
                    </div>
                </form>

            </div>

            <div class="row m-2 ">
                <div class="container">
                    <table class="table table-hover  table-striped align: middle" id="payrollTable">
                        <thead class="text-center align: middle">
                            <tr>
                                <th scope="col" id="_id">Oid</th>
                                <th scope="col" id="name">Name</th>
                                <th scope="col" id="sex">Sex</th>
                                <th scope="col" id="department">Department</th>
                                <th scope="col" id="employeeType">Employee Type</th>
                                <th scope="col" id="role">Role</th>
                                <th scope="col" id="salary">Salary</th>
                                <th scope="col" id="isResign">isResign</th>
                                <th scope="col" id="createdDate">Created Date</th>
                                <th scope="col" id="updatedDate">Updated Date</th>
                            </tr>
                        </thead>
                        <tbody id="empTableBody">
                            <!-- Employee rows will be dynamically generated here -->
                        </tbody>
                    </table>
                </div>
            </div>`;
  },

  initListener() {
    this.formListener();
  },

  formListener() {
    const form = document.getElementById("createEmpForm");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      this.employees.postEmployee(data);
    });
  },

  async updateEmpTableBody() {
    const empData = await this.employees.getEmployees();
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
  },

  async afterRender() {
    this.updateEmpTableBody();
    this.initListener();
  },
};
