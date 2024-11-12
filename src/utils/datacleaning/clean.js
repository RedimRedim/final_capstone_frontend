const moment = require("moment");

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

  commaSeperator(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  formatDateTime(value) {
    return moment(value).format("YYYY-MM-DD hh:mm:ss");
  }

  transformingEmployeesData(dataArray) {
    return dataArray.map((data) => {
      data.basicSalary = this.commaSeperator(data.basicSalary);
      data.date = this.formatDateTime(data.date);
      data.resignDate = data.resignDate.includes("1970")
        ? ""
        : this.formatDateTime(data.resignDate);
      data.createdDate = this.formatDateTime(data.createdDate);
      data.updatedDate = this.formatDateTime(data.updatedDate);
      data.updatedDate = this.formatDateTime(data.updatedDate);
      return data;
    });
  }

  formatStringtoNumber(value) {
    return Number(value.replace(/,/g, ""));
  }

  transformingSalaryData(dataArray) {
    return dataArray.map((data) => {
      data.basicSalary = this.commaSeperator(data.basicSalary);
      data.dailySalary = this.commaSeperator(data.dailySalary);
      data.baseSalary = this.commaSeperator(data.baseSalary);
      data.lateDeduction = this.commaSeperator(data.lateDeduction);
      data.absentDeduction = this.commaSeperator(data.absentDeduction);
      data.totalReleasedSalary = this.commaSeperator(data.totalReleasedSalary);
      data.date = this.formatDateTime(data.date);
      data.createdDate = this.formatDateTime(data.createdDate);
      data.updatedDate = this.formatDateTime(data.updatedDate);
      data.updatedDate = this.formatDateTime(data.updatedDate);
      return data;
    });
  }
}

export const cleaningDataInstance = new CleaningData();
