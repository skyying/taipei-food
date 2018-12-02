import {mapWeekDay} from "../components/constant.js";

export const isRestaurantOpenNow = (hours, name) => {
  let weekDay = mapWeekDay(new Date().getDay());
  let nowHour = new Date().getHours();
  let nowMin = new Date().getMinutes();
  let now = "" + nowHour + nowMin;

  return hours.some((slot, index) => {
    let isOpen = false;
    for (let dayOpenTime in slot.open) {
      if (
        slot.open[dayOpenTime] &&
                slot.open[dayOpenTime].day === weekDay
      ) {
        let {start, end} = slot.open[dayOpenTime];
        let isOpenNow =
                    (start <= now && now <= end) ||
                    (end <= start && (now <= end || now >= start));
        if (isOpenNow) {
          return true;
        }
      }
    }
    return isOpen;
  });
};
