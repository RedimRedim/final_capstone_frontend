import { employeesInstance } from "../component/employees-api";
import { payrollModalInstance } from "../utils/htmlhelper/modal";
export const payroll = {
  employeesInstance,
  payrollModalInstance,

  render() {
    return `<div class="row m-2">
              ${this.payrollModalInstance.empForm}

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
                                <th scope="col" id="resignDate">resignDate</th>
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
            <div class="modalData"></div>`;
  },

  initListener() {
    this.formListener();
    this.payrollModalInstance.initListener();
  },

  formListener() {
    const form = document.getElementById("createEmpForm");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        await this.employeesInstance.postEmployee(data);
        await this.payrollModalInstance.updateEmpTableBody();
        form.reset();
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    });
  },

  async afterRender() {
    await this.payrollModalInstance.updateEmpTableBody();
    this.initListener();
  },
};
