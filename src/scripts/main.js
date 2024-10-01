import "../styles/styles.css";
import "../styles/mediastyles.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TotalEmployees } from "./total.js";
import { Employees } from "./employees.js";
import { ChartEmployees } from "./chart.js";
import { activateNavbar } from "./navbar.js";

if (module.hot) {
  module.hot.accept();
}

activateNavbar();
const EmployeesClass = new Employees();
const TotalEmployeesClass = new TotalEmployees(EmployeesClass);
const ChartEmployeesClass = new ChartEmployees(TotalEmployeesClass);

TotalEmployeesClass.updateTotalHtml();
ChartEmployeesClass.salaryChart();
