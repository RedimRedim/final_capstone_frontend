import { employeesSalaryInstance } from "../component/employees-salary";
import "../styles/salary-table.css";
export const salary = {
  render() {
    return `<div class="row m-2">
    
    <form id="uploadTimekeepingForm">
      <div class="selection-content d-flex flex-row p-0 border border-1 rounded-2 bg-light p-2 flex-grow-1 align-items-center">
        <div class="year-timekeeping-content ">
                <select class="form-select" id="yearSelectTimekeeping" aria-label="Select Year">
                  <option value="2024">2024</option>
                </select>
        </div>

      <div class="month-timekeeping-content ">
              <select class="form-select" id="monthSelectTimekeeping" aria-label="Select Month">
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


    
      <label> Import Timekeeping with RD *.xlsx* format:</label>
      <input type="file" id="fileTimekeeping" name="fileTimekeeping" multiple accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" >
      <button class="btn btn-primary" type="submit" id="timekeepingSubmitBtn">Submit</button>
    </form>

    <div class="selection-content d-flex flex-row p-0 border border-1 rounded-2 bg-light p-2 flex-grow-1 align-items-center">
      <div class="year-salary-content ">
              <select class="form-select" id="yearSelectSalary" aria-label="Select Year">
                <option value="2024">2024</option>
              </select>
      </div>

    <div class="month-salary-content ">
            <select class="form-select" id="monthSelectSalary" aria-label="Select Month">
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

    <div class="button-salary-content" id="salarySubmitBtn">
    <button class="btn btn-primary">Submit</button>
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
                                 <th scope="col" id="requiredWorkDays">Required Work Days</th>
                                <th scope="col" id="requiredRestDays">Required Rest Days</th>
                                <th scope="col" id="dayOff">Day Off</th>
                                <th scope="col" id="basicSalary">Basic Salary</th>
                                <th scope="col" id="dailySalary">Daily Salary</th>
                                <th scope="col" id="finishedWork">Finished Work</th>
                                <th scope="col" id="late">Late</th>
                                <th scope="col" id="absent">Absent</th>
                                <th scope="col" id="baseSalary">Base Salary</th>
                                <th scope="col" id="lateDeduction">Late Deduction</th>
                                <th scope="col" id="absentDeduction">Absent Deduction</th>
                                <th scope="col" id="totalReleasedSalary">Total Released Salary</th>
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

  async afterRender() {
    employeesSalaryInstance.initListener();
  },
};
