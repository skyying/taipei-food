import React from "react";
export const FilterList = ({
  price,
  updatePrice,
  updateOpenTime,
  isOpenNow
}) => {
  const priceFilter = Object.keys(price).map((opt, index) => (
    <div key={`price-filter-${index}`} onClick={() => updatePrice(opt)}>
      {opt}
    </div>
  ));

  const openNowBtn = <div onClick={() => updateOpenTime()}>Open Now</div>;
  return (
    <div>
      {priceFilter}
      <div>{openNowBtn}</div>
    </div>
  );
};
