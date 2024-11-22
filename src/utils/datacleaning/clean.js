const moment = require("moment");

class CleaningData {
  constructor() {}

  monthlyDepartmentDataHtml(data) {
    let monthlyDeptDataHtml = [];

    data.deptData.forEach((item) => {
      if (item.month == data.month && item.year == data.year) {
        monthlyDeptDataHtml.push(`<tr>
          <td>${item.department}</td>
          <td>${item.totalEmployees}</td>
          <td>${item.totalResign}</td>
          <td>${item.resignRatioRate}</td>
          <td>${item.lateMinutes}</td>
          <td>${item.absentDays}</td>
          <td>${item.lateDeduction}</td>
          <td>${item.absentDeduction}</td>
        </tr>`);
      }
    });
    return monthlyDeptDataHtml.join("");
  }

  yearlyChartData(data) {
    const yearFilteredData = data.data.filter((item) => item.year == data.year);
    yearFilteredData.sort((a, b) => a.month - b.month);
    const monthArray = yearFilteredData.map((item) => item.month);
    const totalEmployeesArray = yearFilteredData.map(
      (item) => item.totalEmployeesReleased
    );

    const salaryArray = yearFilteredData.map((item) => item.totalSalary);
    return { monthArray, totalEmployeesArray, salaryArray };
  }

  yearlyEmployeeTotalData(monthlyTotalData) {
    const yearFilteredData = monthlyTotalData.data.filter(
      (item) => item.year == monthlyTotalData.year
    );

    const yearlyTotalRegularProbation = yearFilteredData.reduce(
      (acc, item) => {
        acc.totalRegular += item.totalRegular || 0;
        acc.totalProbation += item.totalProbation || 0;
        return acc;
      },
      { totalRegular: 0, totalProbation: 0 }
    ); //initial accumulator
    return { yearlyTotalRegularProbation, year: monthlyTotalData.year };
  }

  transformingMonth(monthArray) {
    const monthMap = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
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
    const num = Number(value); // Ensure the value is a number
    if (!isNaN(num)) {
      return num.toLocaleString("en-US");
    } else {
      return value; // If it's not a valid number, return the original value
    }
  }

  formatDateTime(value) {
    return moment(value).format("YYYY-MM-DD hh:mm:ss");
  }

  transformPercentange(value) {
    return (value * 100).toFixed(2) + "%";
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
    return value ? Number(value.replace(/,/g, "")) : "";
  }

  transformingDepartmentData(dataArray) {
    return dataArray.map((data) => {
      data.totalEmployees = this.commaSeperator(data.totalEmployees);
      data.totalResign = this.commaSeperator(data.totalResign);
      data.resignRatioRate = this.transformPercentange(data.resignRatioRate);
      data.lateMinutes = this.commaSeperator(data.lateMinutes);
      data.absentDays = this.commaSeperator(data.absentDays);
      data.lateDeduction = this.commaSeperator(data.lateDeduction);
      data.absentDeduction = this.commaSeperator(data.absentDeduction);
      return data;
    });
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
