import React from "react";
export const Category = ({options, updateKeyword}) => {
  const categories = options.map((opt, index) => (
    <li
      onClick={() => updateKeyword(opt)}
      key={`category-opt-${index}`}>
      {opt}
    </li>
  ));
  return <ul className="categories">{categories}</ul>;
};
