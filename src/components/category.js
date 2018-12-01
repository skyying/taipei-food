import React from "react";
export const Category = ( { options } ) => {
  console.log(options);
  return options.map((opt, index) => (
    <div key={`category-opt-${index}`}>{opt}</div>
  ));
};
