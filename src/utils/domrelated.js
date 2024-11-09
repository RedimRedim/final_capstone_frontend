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

export const navbarActiveConfiguration = (url) => {
  url = url == "/" ? "home" : url.replace(/\//g, "");
  const navbarLinks = document.querySelectorAll(".navbar-link");
  navbarLinks.forEach((link) => {
    let anchor = link.querySelector("a");
    let currentHrefValue = anchor.textContent.toLocaleLowerCase();
    if (currentHrefValue.includes(url)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};
