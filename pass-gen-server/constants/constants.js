const todayDate = new Date();

const addDays = (days, date = todayDate) => {
  let nextDay = date;
  nextDay.setDate(date.getDate() + days);
  return nextDay;
};
module.exports = { todayDate, addDays };
