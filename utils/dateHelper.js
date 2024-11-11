const { DateTime } = require("luxon");

const parseDateTime = (date) => {
  return typeof date === "string"
    ? DateTime.fromISO(date)
    : DateTime.fromJSDate(date);
};

const getStartOfDay = (date) => {
  const parsedDay = parseDateTime(date);
  const startOfDay = parsedDay.isValid
    ? parsedDay.startOf("day")
    : DateTime.now().startOf("day");
  return startOfDay;
};

module.exports = {
  getStartOfDay,
};
