const API_URL = "http://localhost:2000";

export class Employees {
  constructor() {
    this.dataEmployees;
  }

  async getEmployees() {
    try {
      const response = await fetch(`${API_URL}/api/employees`, {
        method: "GET",
      });
      const data = await response.json();
      this.dataEmployees = data.employees;
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
      const response = await fetch(`${API_URL}/api/employees/monthly-salary/`);

      const monthlyData = await response.json();
      return monthlyData.data;
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
      console.log(error);
    }
  }
}
