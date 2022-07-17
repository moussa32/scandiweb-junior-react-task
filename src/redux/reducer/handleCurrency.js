const defaultCurrency = { label: "USD", symbol: "$" };

const currency = (state = defaultCurrency, action) => {
  switch (action.type) {
    case "CHANGE_CURRENCY":
      return action.payload;

    default:
      return state;
  }
};

export default currency;
