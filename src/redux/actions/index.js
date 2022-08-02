export const changeCurrency = (currency) => {
  return { type: "CHANGE_CURRENCY", payload: currency };
};

export const delItem = (product) => {
  return {
    type: "DELETE_ITEM",
    payload: product,
  };
};

export const addItem = (product) => {
  return {
    type: "ADD_ITEM",
    payload: product,
  };
};

export const addProducts = (products) => {
  return {
    type: "ADD_PRODUCTS",
    payload: products,
  };
};
