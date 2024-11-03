import { Employees } from "../component/employees-api";
import DataTable from "datatables.net-bs5";
import { Modal } from "bootstrap";
import { empForm, updateEmpDetailsForm } from "../utils/htmlhelper/emp-form";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
let dataTableInstance;
import { empUpdateModalHtml, empDelModalHtml } from "../utils/htmlhelper/modal";
export const payroll = {
  employees: new Employees(),

  render() {
    return `<div class="row m-2">

              ${empForm}
            <input type="file" multiple accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" ></input>

            </div>

            <div class="row m-2 ">
                <div class="container">
                    <table class="table table-hover  table-striped align: middle" id="payrollTable">
                        <thead class="text-center align: middle">
                            <tr>
                                <th scope="col" id="uuid">Uuid</th>
                                <th scope="col" id="name">Name</th>
                                <th scope="col" id="sex">Sex</th>
                                <th scope="col" id="department">Department</th>
                                <th scope="col" id="employeeType">Employee Type</th>
                                <th scope="col" id="role">Role</th>
                                <th scope="col" id="basicSalary">Basic Salary</th>
                                <th scope="col" id="dayOff">Day Off</th>
                                <th scope="col" id="isResign">isResign</th>
                                <th scope="col" id="createdDate">Created Date</th>
                                <th scope="col" id="updatedDate">Updated Date</th>
                                <th scope="col" id="edit">Edit</th>
                            </tr>
                        </thead>
                        <tbody id="empTableBody">
                            <!-- Employee rows will be dynamically generated here -->
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Modal -->
           ${empUpdateModalHtml(empForm)}
           ${empDelModalHtml}`;
  },

  initListener() {
    this.formListener();
    this.updateDeleteModalListener();
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
      empTableHtml.push(`
        <tr>
        <td data-uuid="${data.uuid}">${data.uuid}</td>
        <td data-name="${data.name}">${data.name}</td>
        <td data-sex="${data.sex}">${data.sex}</td>
        <td data-department="${data.department}">${data.department}</td>
        <td data-employee-type="${data.employeeType}">${data.employeeType}</td>
        <td data-role="${data.role}">${data.role}</td>
        <td data-basic-salary="${data.basicSalary}">${data.basicSalary}</td>
        <td data-day-off="${data.dayOff}">${data.dayOff}</td>
        <td data-is-resign="${data.isResign}">${data.isResign}</td>
        <td data-created-date="${data.createdDate}">${data.createdDate}</td>
        <td data-updated-date="${data.updatedDate}">${data.updatedDate}</td>
        <td>
            <button class="btn btn-primary update-btn" id="updateBtn" data-uuid="${data.uuid}" data-toggle="modal" data-target"=#updateModal">Update</button>
            <button class="delete-btn" id="delBtn" data-uuid="${data.uuid}">Delete</button>
        </td>
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

  updateDeleteModalListener() {
    const updateModalBtns = document.querySelectorAll("#updateBtn");
    updateModalBtns.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const updateModal = new Modal(document.getElementById("updateModal"));
        const empId = btn.getAttribute("data-uuid");
        const empDetails = await this.employees.getEmployeesId(empId);
        updateEmpDetailsForm(empDetails);
        updateModal.show();
      });
    });

    const deleteModalBtns = document.querySelectorAll("#delBtn");
    deleteModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = new Modal(document.getElementById("deleteModal"));
        modal.show();
      });
    });
  },

  async afterRender() {
    await this.updateEmpTableBody();
    this.initListener();
  },
};
