const API_URL = "https://finalcapstonebackend-production.up.railway.app";
import { cleaningDataInstance } from "../utils/datacleaning/clean";
class Employees {
  constructor() {
    this.dataEmployees;
    this.monthlyData;
  }

  async getEmployees() {
    try {
      const response = await fetch(`${API_URL}/api/employees`, {
        method: "GET",
      });
      const data = await response.json();
      this.dataEmployees = data.employees;
      this.dataEmployees = cleaningDataInstance.transformingEmployeesData(
        this.dataEmployees
      );
      return this.dataEmployees;
    } catch (error) {
      return error;
    }
  }

  async getEmployeesId(empId) {
    const empData = this.dataEmployees.filter((item) => item.uuid == empId);
    return empData[0];
  }

  async getMonthlySalary() {
    try {
      if (typeof this.monthlyData === "undefined") {
        const response = await fetch(
          `${API_URL}/api/employees/monthly-salary/`
        );

        const monthlyData = await response.json();
        this.monthlyData = monthlyData.data;
        return this.monthlyData;
      }

      return this.monthlyData;
    } catch (error) {
      return error;
    }
  }

  async getMonthlyDepartment(year, month) {
    try {
      const reqQueryDate = `${year}-${month}`;
      const response = await fetch(
        `${API_URL}/api/employees/monthly-department/?date=${reqQueryDate}`
      );

      const monthlyData = await response.json();
      return monthlyData.data;
    } catch (error) {
      return error;
    }
  }
  async postEmployee(formData) {
    try {
      console.log(API_URL);
      const response = await fetch(`${API_URL}/api/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.text}`);
      }

      const data = await response.json();
      alert(`Adding new employee, ${JSON.stringify(data)}`);
    } catch (error) {
      alert("Error adding new employee", error);
    }
  }

  async patchEmployee(empId, formData) {
    try {
      console.log(formData);
      const response = await fetch(`${API_URL}/api/employees/${empId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to Update Employee, message: 
          ${errorData.error}`
        );
      }

      const data = await response.json();
      alert(`Adding new employee, ${JSON.stringify(data)}`);
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }

  async deleteEmployee(empId) {
    try {
      const response = await fetch(`${API_URL}/api/employees/${empId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, ${errorData}'`
        );
      }

      const data = await response.json();
      alert(`${JSON.stringify(data)}`);
      return true;
    } catch (error) {
      alert("Error deleting employee", error);
      return false;
    }
  }
}

export const employeesApiInstance = new Employees();
