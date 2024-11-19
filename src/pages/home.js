import { TotalEmployees } from "../component/total";
import { employeesApiInstance } from "../component/employees-api";
import { chartEmployeesInstance } from "../component/chart";

export const home = {
  employees: employeesApiInstance,
  totalEmployees: new TotalEmployees(chartEmployeesInstance),

  render() {
    return `<div class="row m-2" style="height:70px">
        <div
          class="selection-content d-flex flex-row p-0 gap-3 border border-1 rounded-2 bg-light p-2 flex-grow-1 justify-content-end align-items-center">
         
          <div class="year-filter-content ">
              <select class="form-select" id="yearSelect" aria-label="Select Year">
                <option value="2023">2023</option>
                <option value="2024" selected>2024</option>
              </select>
          </div>
         
          <div class="month-filter-content ">
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
      </div>


      <div class="row m-2">
        <div class="d-flex flex-row p-0 gap-3">
          <div class="totalContent  border border-1 rounded-2 bg-light">
            <p class="totalTitle">Total Employees</p>
            <div id="totalEmployee" class="totalValue"></div>
          </div>
          <div class="totalContent  border border-1 rounded-2 bg-light">
            <p class="totalTitle">Avg Basic Salary</p>
            <div id="avgBasicSalary" class="totalValue"></div>
          </div>
          <div class="totalContent  border border-1 rounded-2 bg-light">
            <div class="totalRegular d-flex flex-row justify-content-between align-items-center">
              <p class="totalTitle">Total Regular</p>
              <p id="totalRegular" class="totalValue "></p>
            </div>
            <div class="totalProbation d-flex flex-row justify-content-between align-items-center">
              <p class="totalTitle">Total Probation</p>
              <p id="totalProbation" class="totalValue "></p>
            </div>

          </div>
          <div class="totalContent  border border-1 rounded-2 bg-light">
            <div class="totalGender d-flex flex-row justify-content-between align-items-center">
              <p class="totalTitle">Total Male</p>
              <p id="totalMale" class="totalValue"></p>
            </div>
            <div class="totalFemale d-flex flex-row justify-content-between align-items-center">
              <p class="totalTitle">Total Female</p>
              <p id="totalFemale" class="totalValue"></p>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-2">
        <div class="content1 d-flex flex-row gap-2 p-0 w-100">
          <div class="chart-content1 p-1  border border-1 rounded-2 bg-light p-2" style="width: 32%">
            <canvas id="totalEmployeesChart"></canvas>
          </div>

          <div class="tableDepartment" id="tableDepartment" border border-1 rounded-2 bg-light p-2">
            <table class="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Department</th>
                  <th scope="col">Total Employees</th>
                  <th scope="col">Total Resign</th>
                  <th scope="col">Resign Ratio</th>
                  <th scope="col">Late Minutes</th>
                  <th scope="col">Absent Days</th>
                  <th scope="col">Late Deduction</th>
                  <th scope="col">Absent Deduction</th>
                </tr>
              </thead>
              <tbody class="tableDepartmentBody" id="tableDepartmentBody">
                <!-- <tr>
                  <td scope="row">FE</td>
                  <td>5</td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row m-2 border border-1 rounded-2 bg-dark">
        <div class="content1">
          <div class="chart-content1 p-1" style="height: 400px">
            <canvas id="salaryChart"></canvas>
          </div>
        </div>


      </div>
      
      <div class="row m-2">
        <div class="col-4 border border-2 rounded-2">
          <div class="totalTitle">
              <div class="rectangle border border-2 fs-6" style="background-color:rgb(248,249,250)"></div>
              Total Based in Employees Created Date
          </div>
          <div class="totalTitle">
            <div class="rectangle border border-2 fs-6" style="background-color:rgb(33,37,41);"></div>
            Total Based in Salary Released Month & Year</div>
          </div>
        </div>
      </div>
      `;
  },

  initListener() {
    this.setUpListener();
  },

  setUpListener() {
    const selectMonthElement = document.getElementById("monthSelect");
    const selectYearElement = document.getElementById("yearSelect");

    selectMonthElement.addEventListener("change", async (event) => {
      const monthOption = event.target.value;
      const yearOption = selectYearElement.value;
      await this.totalEmployees.updateTotalHtml(yearOption, monthOption);
    });

    selectYearElement.addEventListener("change", async (event) => {
      const yearOption = event.target.value;
      const monthOption = selectMonthElement.value;
      await this.totalEmployees.updateTotalHtml(yearOption, monthOption);
      await this.totalEmployees.updateChartHtml(yearOption);
    });
  },

  async contentLoadedSetup() {
    const selectMonthElement = document.getElementById("monthSelect");
    const selectYearElement = document.getElementById("yearSelect");
    await this.totalEmployees.updateTotalHtml(
      selectYearElement.value,
      selectMonthElement.value
    );
    await this.totalEmployees.updateChartHtml(selectYearElement.value);
  },

  async afterRender() {
    this.contentLoadedSetup();
    this.initListener();
  },
};
