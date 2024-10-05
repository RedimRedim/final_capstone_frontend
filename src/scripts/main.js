import { TotalEmployees } from "./total.js";
import { Employees } from "./employees.js";
import { ChartEmployees } from "./chart.js";
import { activateNavbar } from "./navbar.js";
import { currentMonthSelection } from "./domrelated.js";

if (module.hot) {
  module.hot.accept();
}

const currentMonth = currentMonthSelection();
activateNavbar();

const EmployeesClass = new Employees();
const TotalEmployeesClass = new TotalEmployees(EmployeesClass);
const ChartEmployeesClass = new ChartEmployees(TotalEmployeesClass);

const monthSelect = () => {
  const selecteElement = document.getElementById("monthSelect");

  selecteElement.addEventListener("change", async (event) => {
    const monthOption = event.target.value;
    console.log(monthOption);
    await TotalEmployeesClass.updateTotalHtml(monthOption);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  TotalEmployeesClass.updateTotalHtml(currentMonth);
  ChartEmployeesClass.salaryChart();
  monthSelect();
});
