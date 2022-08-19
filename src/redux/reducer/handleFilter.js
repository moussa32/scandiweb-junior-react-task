const filterParameters = { params: {}, products: [] };

const filter_Parameters = (state = filterParameters, action) => {
  switch (action.type) {
    case "ADD_FILTERED_PRODUCTS":
      const updatedFilterProducts = { ...state, products: action.payload };
      return (state = updatedFilterProducts);
    case "ADD_FILTER_PARAMETERS":
      const updatedFilterParams = { ...state, params: { ...action.payload } };
      return (state = updatedFilterParams);
    case "DELETE_FILTER_PARAMETER":
      let updatedFilterParam = { ...state.params };
      delete updatedFilterParam[action.payload.toLowerCase()];
      return (state = { ...state, params: updatedFilterParam });
    case "RESET_FILTER_PARAMETERS":
      return (state = { ...state, params: {} });

    default:
      return state;
  }
};

export default filter_Parameters;
