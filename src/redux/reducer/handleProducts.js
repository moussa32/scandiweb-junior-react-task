const defaultProductsState = [];

const products = (state = defaultProductsState, action) => {
  switch (action.type) {
    case "ADD_PRODUCTS":
      return (state = action.payload);
    default:
      return state;
  }
};

export default products;
