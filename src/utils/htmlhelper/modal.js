import { Modal } from "bootstrap";
import { employeesInstance } from "../../component/employees-api";
import { empForm, updateEmpDetailsForm } from "./emp-form.js";

class PayrollModalClass {
  constructor() {
    this.employeesInstance = employeesInstance;
    this.empForm = empForm;
    this.empDetails;
  }

  initListener() {
    this.setupModalHtml();
    this.updateDeleteModalListener();
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
            <button type="button" class="btn btn-primary del-emp-Data">Delete</button>
          </div>

      </div>
    </div>
  </div>
`;
  }

  updateDeleteModalListener() {
    const empTableDiv = document.getElementById("empTableBody");

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
      await this.PutEmpData(event);
    }

    if (event.target.classList.contains("delete-btn")) {
      this.uuid = event.target.dataset.uuid;
      const modal = new Modal(document.getElementById("deleteModal"));
      modal.show();
      await this.delEmpData(event);
    }
  }

  async PutEmpData(event) {
    if (event.target.classList.contains("update-emp-data")) {
      const data = {
        name: document.querySelector("#updateEmpForm .emp-group #name").value,
        sex: document.querySelector(
          '#updateEmpForm .emp-group input[name="sex"]:checked'
        ).value,
        department: document.querySelector("#updateEmpForm select#department")
          .value,
        employeeType: document.querySelector(
          "#updateEmpForm select#employeeType"
        ).value,
        role: document.querySelector("#updateEmpForm .emp-group #role").value,
        basicSalary: document.querySelector(
          "#updateEmpForm .emp-group #basicSalary"
        ).value,
        dayOff: document.querySelector("#updateEmpForm select#dayOff").value,
        isResign:
          document.querySelector('input[name="isResign"]:checked').value ==
          "true"
            ? true
            : false,
        resignDate:
          document.querySelector('input[name="isResign"]:checked').value ==
          "true"
            ? document.querySelector("#updateEmpForm input#resignDate").value
            : new Date("1970-01-01"),
      };
      await this.employeesInstance.patchEmployee(empId, data);
    }
  }

  async delEmpData(event) {
    console.log(event.target);
    if (event.target.classList.contains("del-emp-Data")) {
      await this.employeesInstance.deleteEmployee(this.uuid);
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
