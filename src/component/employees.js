const API_URL = "http://localhost:2000";

export class Employees {
  constructor() {}

  async getEmployees() {
    try {
      const response = await fetch(`${API_URL}/api/employees`, {
        method: "GET",
      });
      const data = await response.json();
      return data.employees;
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

  async postEmployee(formData) {
    try {
      const response = await fetch(`${API_URL}/api/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      const data = await response.json();
      alert(`Adding new employee, ${JSON.stringify(data)}`);
    } catch (error) {
      console.log(error);
    }
  }
}
