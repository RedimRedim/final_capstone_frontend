const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const currentMonthIndex = new Date().getMonth(); // Gets the current month index (0-11)

export const currentMonthSelection = () => {
  const monthSelectDiv = document.getElementById("monthSelect");

  monthSelectDiv.value = months[currentMonthIndex];

  return months[currentMonthIndex];
};
