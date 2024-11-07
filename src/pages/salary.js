import { employeesSalaryInstance } from "../component/employees-salary";

export const salary = {
  render() {
    return `<div class="row m-2">
    
    <div class="selection-content d-flex flex-row p-0 border border-1 rounded-2 bg-light p-2 flex-grow-1 align-items-center">
      <div class="year-timekeeping-content ">
              <select class="form-select" id="yearSelect" aria-label="Select Year">
                <option value="2024">2024</option>
              </select>
      </div>

    <div class="month-timekeeping-content ">
            <select class="form-select" id="monthSelect" aria-label="Select Month">
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
    </div>
    </div>


    <form id="uploadTimekeepingForm">
      <label> Import Timekeeping with RD *.xlsx* format:</label>
      <input type="file" id="fileTimekeeping" name="fileTimekeeping" multiple accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" >
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>

    <div class="selection-content d-flex flex-row p-0 border border-1 rounded-2 bg-light p-2 flex-grow-1 align-items-center">
      <div class="year-salary-content ">
              <select class="form-select" id="yearSelect" aria-label="Select Year">
                <option value="2024">2024</option>
              </select>
      </div>

    <div class="month-salary-content ">
            <select class="form-select" id="monthSelect" aria-label="Select Month">
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
    </div>
    </div>


     <div class="row m-2 ">
                <div class="container">
                    <table class="table table-hover  table-striped align: middle" id="salaryTable">
                        <thead class="text-center align: middle">
                            <tr>
                                <th scope="col" id="uuid">Uuid</th>
                                <th scope="col" id="name">Name</th>
                                <th scope="col" id="sex">Sex</th>
                                <th scope="col" id="department">Department</th>
                                <th scope="col" id="employeeType">Employee Type</th>
                                <th scope="col" id="role">Role</th>
                                 <th scope="col" id="requiredWorkDays">requiredWorkDays</th>
                                <th scope="col" id="requiredRestDays">requiredRestDays</th>
                                <th scope="col" id="basicSalary">Basic Salary</th>
                                <th scope="col" id="dailySalary">dailySalary</th>
                                <th scope="col" id="dayOff">Day Off</th>
                                <th scope="col" id="finishedWork">finishedWork</th>
                                <th scope="col" id="late">late</th>
                                <th scope="col" id="absent">absent</th>
                                <th scope="col" id="baseSalary">baseSalary</th>
                                <th scope="col" id="lateDeduction">lateDeduction</th>
                                <th scope="col" id="absentDeduction">absentDeduction</th>
                                <th scope="col" id="totalReleasedSalary">totalReleasedSalary</th>
                            </tr>
                        </thead>
                        <tbody id="salaryTableBody">
                            <!-- Employee rows will be dynamically generated here -->
                        </tbody>
                    </table>
                </div>
            </div>
    </div>`;
  },

  initListener() {
    this.readInputFileFormListener();
  },

  readInputFileFormListener() {
    document
      .getElementById("uploadTimekeepingForm")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        const fileInput = document.getElementById("fileTimekeeping");
        const file = fileInput.files[0];
        const result = await employeesSalaryInstance.calculateTimekeepingApi(
          file
        );
        if (result) {
          console.log(result);
          employeesSalaryInstance.updateSalaryTableBody(result);
        }
      });
  },

  async afterRender() {
    this.initListener();
  },
};
