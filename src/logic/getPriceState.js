export const getPriceState = (prevState, opt) => {
  let {price, isFirstToggle} = prevState;
  if (isFirstToggle && isAllPirceOptSelected(price)) {
    let updateOption = {};
    for (let option in prevState.price) {
      if (prevState.price[option] && option !== opt) {
        updateOption[option] = false;
      }
    }
    return {
      isFirstToggle: false,
      price: Object.assign(prevState.price, updateOption)
    };
  }

  if (onlyCurrentOptSelected(price, opt)) {
    let updateOption = {};
    for (let option in prevState.price) {
      updateOption[option] = true;
    }
    return {
      isFirstToggle: true,
      price: updateOption
    };
  }

  let priceTag = {};
  priceTag[opt] = !prevState.price[opt];
  return {
    isFirstToggle: false,
    price: Object.assign(prevState.price, priceTag)
  };
};

const isAllPirceOptSelected = price => {
  return Object.keys(price).every(opt => price[opt]);
};

const onlyCurrentOptSelected = (price, current) => {
  let allSelectedOpt = Object.keys(price).filter(opt => price[opt]);
  return (
    allSelectedOpt.length === 1 &&
        allSelectedOpt[0] === current &&
        price[current]
  );
};
