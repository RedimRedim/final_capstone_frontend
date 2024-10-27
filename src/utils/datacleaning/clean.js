export class CleaningData {
  constructor() {}

  monthlyDepartmentDataHtml(data) {
    let monthlyDeptDataHtml = [];

    data.deptData.forEach((item) => {
      if (item.month == data.month && item.year == data.year) {
        monthlyDeptDataHtml.push(`<tr>
          <td>${item.department}</td>
          <td>${item.totalEmployees}</td>
        </tr>`);
      }
    });

    return monthlyDeptDataHtml.join("");
  }

  yearlyChartData(data) {
    console.log(data);
    yearFilteredData = data.filter((item) => item.year == data.year);

    const monthArray = yearFilteredData.map((item) => item.month);
    const totalEmployeesArray = yearFilteredData.map(
      (item) => item.totalEmployees
    );
    const salaryArray = yearFilteredData.map((item) => item.totalSalary);
    return { monthArray, totalEmployeesArray, salaryArray };
  }
}
