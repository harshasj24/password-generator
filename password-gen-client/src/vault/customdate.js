let months = [
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
let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const formatDate = (fullDate) => {
  const selectedDate = new Date(fullDate);
  let day = dayNames[selectedDate.getDay()];
  let month = months[selectedDate.getMonth()];
  let date = selectedDate.getDate();
  let year = selectedDate.getFullYear();
  return `${day}, ${month} ${date}, ${year}`;
};
export const formatTime = (fullDate) => {
  const getTime = new Date(fullDate);
  let getHours = getTime.getHours();
  let hours = "";
  let minutes = getTime.getMinutes();
  let suffix = getHours >= 12 ? "PM" : "AM";
  if (getHours === 0) {
    hours = "12";
  } else if (getHours > 12) {
    hours = "" + getHours - 12;
  } else {
    hours = getHours;
  }
  return `${hours}:${minutes} ${suffix}`;
};
