export const today = () => {
  let now = new Date();
  let yy = (now.getYear() % 100) + 2000;
  let mm = now.getMonth() < 10 ? "0" + now.getMonth() : now.getMonth();
  let dd = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  return `${yy}-${mm}-${dd}`;
};
