import { TotalEmployees } from "../component/total";
import { Employees } from "../component/employees";
import { ChartEmployees } from "../component/chart";

export const home = {
  employees: new Employees(),
  chartEmployees: new ChartEmployees(),
  totalEmployees: new TotalEmployees(),

  render() {
    return `<div class="row m-2" style="height:70px">
        <div
          class="selection-content d-flex flex-row p-0 border border-1 rounded-2 bg-light p-2 flex-grow-1 justify-content-end align-items-center">
          <div class="filter-content ">
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
            <p class="totalTitle">Total Employee</p>
            <div id="totalEmployee" class="totalValue"></div>
          </div>
          <div class="totalContent  border border-1 rounded-2 bg-light">
            <p class="totalTitle">Total Salary</p>
            <div id="totalSalary" class="totalValue"></div>
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
          <div class="table-content2  border border-1 rounded-2 bg-light p-2">
            table-content2
          </div>

          <div class="table-content1  border border-1 rounded-2 bg-light p-2">
            <table class="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Department</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody class="table-content1body">
                <!-- <tr>
                  <td scope="row">FE</td>
                  <td>5</td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row m-2 border border-1 rounded-2 bg-light">
        <div class="content1">
          <div class="chart-content1 p-1" style="height: 400px">
            <canvas id="salaryChart"></canvas>
          </div>
        </div>
      </div>`;
  },

  initListener() {
    const selecteElement = document.getElementById("monthSelect");

    selecteElement.addEventListener("change", async (event) => {
      const monthOption = event.target.value;
      await this.totalEmployees.updateTotalHtml(monthOption);
    });
  },

  async contentLoadedSetup() {
    const selecteElement = document.getElementById("monthSelect");
    await this.totalEmployees.updateTotalHtml(selecteElement.value);
    await this.chartEmployees.salaryChart();
  },

  async afterRender() {
    this.contentLoadedSetup();
    this.initListener();
  },
};
