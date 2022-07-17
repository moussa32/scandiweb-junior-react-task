//Convert product currency by taking all product prices and the currency's label to choose and return the new currency
export const currencyConverter = (currencies, currencyLabel) => {
  return currencies.find((currencyItem) => currencyItem.currency.label === currencyLabel);
};
