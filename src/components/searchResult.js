import React from "react";
import "../style/resultItem.scss";
import {Rating} from "./rating.js";
import {mapWeekDay} from "./constant.js";

export const ResultList = ({list, updateKeyword}) => {
  if (!list.length) {
    return <div className="empty-result">No Matched Restaurants</div>;
  }

  const results = list.map((item, index) => {
    return (
      <div key={`result-item-${index}`}>
        <ResultItem
          resultId={index + 1}
          data={item}
          updateKeyword={updateKeyword}
        />
      </div>
    );
  });

  return (
    <div>
      <h5>Sort by rating</h5>
      {results}
    </div>
  );
};

const ResultItem = ({resultId, data, updateKeyword}) => {
  let weekDay = mapWeekDay(new Date().getDay());
  weekDay = 5;
  let filtered = data.hours.filter(slot =>
    slot.open.some(day => day.day === weekDay)
  );

  let todayOpenTime = filtered.map(slot =>
    slot.open.filter(day => day.day === weekDay).map((day, index) => {
      return (
        <span key={`open-time-${index}`}>
          {index === 0 && <span> 本日營業時間 : </span>}
          {index > 0 && ", "}
          <span>
            {day.start} ~ {day.end}
          </span>
        </span>
      );
    })
  );

  let categoriesTitle = data.categories.map((item, index) => (
    <a
      key={`categories-title-${index}`}
      onClick={() => {
        updateKeyword(item.title);
      }}>
      {item.title}
      {index !== data.categories.length - 1 ? "," : ""}{" "}
    </a>
  ));

  return (
    <div className="result-item">
      <div className="photo-box">
        <img src={data.photos[0]} />
      </div>
      <div className="info">
        <div>
          <h4>
            {resultId} {data.name}
          </h4>
          <div className="rating-row">
            <Rating score={data.rating} />
            <span className="reviews">
              {data.review_count} reviews
            </span>
          </div>
          <div>
            {data.price} - {categoriesTitle}
          </div>
        </div>
        <div />
        {todayOpenTime}
        <div>
          {data.location.address1} ( {data.location.city} )
        </div>
      </div>
    </div>
  );
};
