const API_URL = "http://localhost:2000";

export class Employees {
  constructor() {
    this.employees = this.getEmployees();
    this.getMonthlySalary = this.getMonthlySalary();
  }

  async getEmployees() {
    try {
      const response = await fetch(`${API_URL}/api/employees`, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getMonthlySalary() {
    try {
      const response = await fetch(`${API_URL}/api/employees/monthly-salary`);

      const monthlyData = await response.json();
      return monthlyData.data;
    } catch (error) {
      return error;
    }
  }
}
