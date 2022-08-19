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

export const addFilterParameters = (parameters) => {
  return {
    type: "ADD_FILTER_PARAMETERS",
    payload: parameters,
  };
};

export const deleteFilterParameter = (parameter) => {
  return {
    type: "DELETE_FILTER_PARAMETER",
    payload: parameter,
  };
};

export const addFilterProducts = (products) => {
  return {
    type: "ADD_FILTERED_PRODUCTS",
    payload: products,
  };
};

export const resetFilterParameters = () => {
  return {
    type: "RESET_FILTER_PARAMETERS",
  };
};
