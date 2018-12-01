import React from "react";
import "../style/resultItem.scss";

export const ResultList = ({list}) => {
  if (!list.length) {
    return <div>no result</div>;
  }

  return list.map((item, index) => {
    return (
      <div key={`result-item-${index}`}>
        <ResultItem data={item} />
      </div>
    );
  });
};

const ResultItem = ({data}) => {
  return (
    <div className="result-item">
      <div>
        <img src={data.photos[0]} />
      </div>
      <div>
        <div>
          <h4>{data.name}</h4>
          <div>{data.rating}</div>
          <div>{data.price}</div>
          <div>{}</div>
        </div>
        <div>
          {data.location.city} {data.location.address1}
        </div>
      </div>
    </div>
  );
};
