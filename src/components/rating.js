import "../style/star.scss";
import React from "react";

export const Rating = ({score}) => {
  var roundDecimal = function(val, precision) {
    return (
      Math.round(
        Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10
      ) / Math.pow(10, precision || 0)
    );
  };

  let newScore = roundDecimal(score, 1);
  let stars = Array.from({length: 5})
    .fill(0)
    .map((starType, index) => {
      let type = "";
      if (newScore > 0) {
        type = newScore >= 1 ? "full" : "half";
      } else {
        type = "empty";
      }
      newScore--;
      return <Star key={index} type={type} />;
    });
  return <div id="star-wrapper">{stars}</div>;
};

const Star = ({type}) => {
  const starType = {
    full: "full",
    half: "half",
    empty: "empty"
  };
  return <span className={starType[type]} />;
};
