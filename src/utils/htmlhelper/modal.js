import { Modal } from "bootstrap";
import { employeesInstance } from "../../component/employees-api";
import { empForm, updateEmpDetailsForm } from "./emp-form.js";
import DataTable from "datatables.net-bs5";
let dataTableInstance;
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

class PayrollModalClass {
  constructor() {
    this.employeesInstance = employeesInstance;
    this.empForm = empForm;
    this.empDetails;
  }

  async updateEmpTableBody() {
    // UPDATE ENTIRE TABLE
    const empData = await this.employeesInstance.getEmployees();
    let empTableHtml = [];
    let formattedData = [];
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
        <td data-resign-date="${data.resignDate}">${data.resignDate}</td>
        <td data-created-date="${data.createdDate}">${data.createdDate}</td>
        <td data-updated-date="${data.updatedDate}">${data.updatedDate}</td>
        <td>
            <button class="btn btn-primary update-btn" id="updateBtn" data-uuid="${data.uuid}" data-toggle="modal" data-target"=#updateModal">Update</button>
            <button class="delete-btn" id="delBtn" data-uuid="${data.uuid}">Delete</button>
        </td>
    </tr>
          `);
      // Push formatted data for DataTable
      formattedData.push([
        data.uuid,
        data.name,
        data.sex,
        data.department,
        data.employeeType,
        data.role,
        data.basicSalary,
        data.dayOff,
        data.isResign,
        data.resignDate,
        data.createdDate,
        data.updatedDate,
        ` <button class="btn btn-primary update-btn" id="updateBtn" data-uuid="${data.uuid}" data-toggle="modal" data-target"=#updateModal">Update</button>
              <button class="delete-btn" id="delBtn" data-uuid="${data.uuid}">Delete</button>`,
      ]);
    });

    document.getElementById("empTableBody").innerHTML = empTableHtml.join("");

    // Initialize DataTable after updating the table body
    if (!dataTableInstance) {
      dataTableInstance = new DataTable("#payrollTable", {
        responsive: true,
      }); // Initialize only once
    } else {
      dataTableInstance.clear(); // Clear previous data
      dataTableInstance.rows.add(formattedData); // Add new data
      dataTableInstance.draw(); // Re-draw the DataTable with updated data
    }
  }

  initListener() {
    this.setupModalHtml();
    this.updateDeleteModalListener();
    this.saveChangesListener = this.updateEmpData.bind(this); // Store the bound function
    this.delChangesListener = this.delEmpData.bind(this);
  }

  setupModalHtml() {
    document.querySelector(".modalData").innerHTML =
      this.empUpdateModalHtml() + this.empDelModalHtml();
  }

  empUpdateModalHtml() {
    return `<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="updateModalLabel">Modal title</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                  ${empForm}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary update-emp-data" id="updateEmpDataBtn">Save changes</button>
                  </div>
                </div>
              </div>
      </div>`;
  }

  empDelModalHtml() {
    return `<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
          <div class="modal-header">
          <h5 class="modal-title" id="confirmDeleteLabel">Confirm Delete</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>

          <div class="modal-body">
            Are you sure you want to delete this item? ${this.uuid}

          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary del-emp-data">Delete</button>
          </div>

      </div>
    </div>
  </div>
`;
  }

  updateDeleteModalListener() {
    const empTableDiv = document.getElementById("empTableBody");
    empTableDiv.removeEventListener("click", this.handleClick.bind(this));
    empTableDiv.addEventListener("click", this.handleClick.bind(this));
  }

  async handleClick(event) {
    if (event.target.classList.contains("update-btn")) {
      this.uuid = event.target.getAttribute("data-uuid");
      this.empDetails = await this.employeesInstance.getEmployeesId(this.uuid);
      updateEmpDetailsForm(this.empDetails);
      const updateModal = new Modal(document.getElementById("updateModal"));
      updateModal.show();
      this.showingResignDateListener();
      this.addSaveChangesListener();
    }

    if (event.target.classList.contains("delete-btn")) {
      this.uuid = event.target.dataset.uuid;
      console.log(this.uuid);
      const delModal = new Modal(document.getElementById("deleteModal"));
      delModal.show();
      this.deleteListener();
    }
  }

  addSaveChangesListener() {
    const saveChanges = document.querySelector(".update-emp-data");
    if (saveChanges) {
      saveChanges.removeEventListener("click", this.saveChangesListener);
      saveChanges.addEventListener("click", this.saveChangesListener);
    }
  }

  deleteListener() {
    const deleteBtn = document.querySelector(".del-emp-data");
    if (deleteBtn) {
      deleteBtn.removeEventListener("click", this.delChangesListener);
      deleteBtn.addEventListener("click", this.delChangesListener);
    }
  }

  async updateEmpData() {
    const data = {
      name: document.querySelector("#updateEmpForm .emp-group #name").value,
      sex: document.querySelector(
        '#updateEmpForm .emp-group input[name="sex"]:checked'
      ).value,
      department: document.querySelector("#updateEmpForm select#department")
        .value,
      employeeType: document.querySelector("#updateEmpForm select#employeeType")
        .value,
      role: document.querySelector("#updateEmpForm .emp-group #role").value,
      basicSalary: document.querySelector(
        "#updateEmpForm .emp-group #basicSalary"
      ).value,
      dayOff: document.querySelector("#updateEmpForm select#dayOff").value,
      isResign:
        document.querySelector('input[name="isResign"]:checked').value == "true"
          ? true
          : false,
      resignDate:
        document.querySelector('input[name="isResign"]:checked').value == "true"
          ? document.querySelector("#updateEmpForm input#resignDate").value
          : new Date("1970-01-01"),
    };

    try {
      const updateEmployee = await this.employeesInstance.patchEmployee(
        this.uuid,
        data
      );
      if (updateEmployee) {
        const updateModalBtn = Modal.getInstance(
          document.getElementById("updateModal")
        );
        updateModalBtn.hide();
        await this.updateEmpTableBody();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async delEmpData() {
    try {
      const delEmployee = await this.employeesInstance.deleteEmployee(
        this.uuid
      );
      const delModal = Modal.getInstance(
        document.getElementById("deleteModal")
      );
      delModal.hide();
      await this.updateEmpTableBody();
    } catch (error) {
      console.error(error);
    }
  }

  showingResignDateListener() {
    document.querySelectorAll('input[name="isResign"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        const isResignTrue = document.querySelector(
          'input[name="isResign"]:checked'
        ).value;

        console.log(isResignTrue);

        if (isResignTrue === "true") {
          const isResignHtml = document.querySelector(
            "#updateEmpForm .emp-group #resignDate"
          ).parentElement;
          isResignHtml.style.display = "block";
        } else {
          const isResignHtml = document.querySelector(
            "#updateEmpForm .emp-group #resignDate"
          ).parentElement;
          isResignHtml.style.display = "none";
        }
      });
    });
  }

  delEmpDataListener() {
    document.getElementById("delEmpData").addEventListener("click", (event) => {
      console.log(`Deleted employee data ${this.uuid}`);
    });
  }
}

export const payrollModalInstance = new PayrollModalClass();
