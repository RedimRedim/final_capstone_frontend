import example1 from "../images/example1-timekeeping.png";
import example2 from "../images/example2-restday.png";
import example3 from "../images/example3-inputtk.png";
import example4 from "../images/example5-success.png";
import example5 from "../images/example4-searching.png";
const PYTHON_API_URL =
  "https://finalcapstonebackendpython-production.up.railway.app";
import { employeesSalaryInstance } from "../component/employees-salary";
import "../styles/salary-table.css";
export const salary = {
  render() {
    return `<div class="row m-2">

      
    <div class="d-flex flex-column p-2 bg-light ">
      <div class="p-2">
        <button class="btn btn-primary mb-2" id ="showInformation">Click for Instruction:</button>
        <div id="informationDetails" style="display:none">
          <div class="d-flex flex-column p-2 gap-2 border border-1 rounded-2" style="background-color:rgba(12,103,258,0.1)">
            <span class="text-secondary "><h5>1. Prepare and Input the Timekeeping File:
            <a href="${PYTHON_API_URL}/download-sample-file" download="sample.xlsx" class="btn btn-primary">Download Sample File</a></>
            </h5></span>

            <h5 class="p-3">Sheet Structure - Sheet1: Columns include: UUID, Name, Working Time, Time In, and Time Out
              <div class="d-flex flex-start">
                <img src="${example1}" class="img-fluid" alt="Example of Timekeeping File">
              </div>
            </h5>
        
            <h5 class="p-3">Sheet Structure - Rest Day (RD): Columns include: UUID, Name, Date, and Status
              <div class="d-flex flex-start">
                <img src="${example2}" class="img-fluid" alt="Example of Rest Day File">
              </div>
            </h5>
        
            <h5 class="text-secondary">2. After the file is being prepared, upload it and make the following selections:</h5>
            
            <div class="d-flex flex-start p-3">
                <img src="${example3}" class="img-fluid" alt="Example of Success Response">
              </div>
              
            <p class="p-3"><strong>File Name:</strong> input_file8 (for Aug)
            <br><strong>Select Year:</strong> 2024
              <br><strong>Select Month:</strong> Aug
              <br>Click <strong>Submit</strong> and wait for the response.
            </p>

            <h5 class="text-secondary">3. Success Response (When both year and month are valid):
              <div class="d-flex flex-start p-3">
                <img src="${example4}" class="img-fluid" alt="Example of Success Response">
              </div>
            </h5>

            <h5 class="text-secondary ">4. You may check the details below by selecting the year and month:
              <div class="d-flex flex-start p-3">
              <img src="${example5}" class="img-fluid" alt="Example of Searching">
              </div>
            </h5>
        </div>
      </div>
    </div>
  </div>
  
    
    <hr>
    <h5>Input Timekeeping:</h5>
    <form id="uploadTimekeepingForm" >
      <div class="selection-content d-flex gap-3 mb-2 flex-row border border-1 rounded-2 bg-light p-2 flex-grow-1 align-items-center">
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
    <hr>
    <h5>Monthly Employees Salary:</h5>
    <div class="selection-content d-flex m-2 gap-3 flex-row bg-light p-2 flex-grow-1 align-items-center">
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
                      <th scope="col" id="basicSalary">Basic Salary</th>
                      <th scope="col" id="dailySalary">Daily Salary</th>
                      <th scope="col" id="finishedWork">Finished Work</th>
                      <th scope="col" id="totalRestDays">Actual Rest Days</th>
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
    </div>`;
  },

  async afterRender() {
    employeesSalaryInstance.initListener();
  },
};
