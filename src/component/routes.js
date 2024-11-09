import { employees } from "../pages/employees.js";
import { home } from "../pages/home.js";
employees;
import { salary } from "../pages/salary.js";

export const routes = {
  "/": home,
  "/employees": employees,
  "/salary": salary,
};
