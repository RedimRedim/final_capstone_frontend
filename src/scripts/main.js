import "../styles/styles.css";
import "../styles/mediastyles.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TotalEmployees } from "./total.js";
import { Employees } from "./employees.js";

const EmployeesClass = new Employees();
const TotalEmployeesClass = new TotalEmployees(EmployeesClass);

TotalEmployeesClass.updateTotalHtml();
