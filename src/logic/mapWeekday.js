export const mapWeekDay = jsWeekDay => {
  return jsWeekDay === 0 ? 6 : jsWeekDay - 1;
};
