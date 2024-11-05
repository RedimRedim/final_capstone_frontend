class CleaningData {
  constructor() {}

  monthlyDepartmentDataHtml(data) {
    let monthlyDeptDataHtml = [];

    data.deptData.forEach((item) => {
      monthlyDeptDataHtml.push(`<tr>
          <td>${item.department}</td>
          <td>${item.totalEmployees}</td>
        </tr>`);
    });

    return monthlyDeptDataHtml.join("");
  }

  yearlyChartData(data) {
    const yearFilteredData = data.data.filter((item) => item.year == data.year);

    const monthArray = yearFilteredData.map((item) => item.month);
    const totalEmployeesArray = yearFilteredData.map(
      (item) => item.totalEmployees
    );
    const salaryArray = yearFilteredData.map((item) => item.totalSalary);
    return { monthArray, totalEmployeesArray, salaryArray };
  }

  transformingMonth(monthArray) {
    const monthMap = {
      1: "Jan",
      2: "Feb",
      3: "March",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sept",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };

    return monthArray.map((month) => monthMap[month]);
  }
}

export const cleaningDataInstance = new CleaningData();
