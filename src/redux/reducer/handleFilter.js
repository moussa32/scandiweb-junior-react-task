const filterParameters = {};

const filter_Parameters = (state = filterParameters, action) => {
  switch (action.type) {
    case "ADD_FILTER_PARAMETERS":
      return { ...action.payload };
    case "RESET_FILTER_PARAMETERS":
      return {};

    default:
      return state;
  }
};

export default filter_Parameters;
