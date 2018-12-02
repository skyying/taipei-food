import React from "react";
import "../style/filterOptions.scss";

export const FilterOptions = ({
  price,
  updatePrice,
  updateOpenTime,
  isOpenNow,
  isFirstToggle
}) => {
  const priceFilter = Object.keys(price).map((opt, index) => (
    <a
      className={price[opt] && !isFirstToggle ? "on" : ""}
      key={`price-filter-${index}`}
      onClick={() => updatePrice(opt)}>
      {opt}
    </a>
  ));
  const openNowBtn = (
    <a
      className={isOpenNow ? "opennow-btn active" : "opennow-btn"}
      onClick={() => updateOpenTime()}>
            Open Now
    </a>
  );
  return (
    <div className="filter-options">
      {priceFilter}
      <span>{openNowBtn}</span>
    </div>
  );
};
