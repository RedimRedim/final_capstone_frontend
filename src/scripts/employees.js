const API_URL = "http://localhost:2000";

export class Employees {
  constructor() {
    this.employees = this.getEmployees();
  }

  async getEmployees() {
    try {
      const response = await fetch(`${API_URL}/employees`, { method: "GET" });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
}
