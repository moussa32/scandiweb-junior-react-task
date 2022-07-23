const minicartState = [];

const minicart = (state = minicartState, actions) => {
  const product = actions.payload;
  const exist = state.find((x) => x.id === product.id);

  switch (actions.type) {
    case "ADD_ITEM":
      if (exist) {
        return state.map((x) => (x.id === product.id ? { ...x, qty: x.qty + 1 } : x));
      } else {
        return [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
      }

    case "DELETE_ITEM":
      if (exist.qty === 1) {
        return state.filter((x) => x.id !== exist.id);
      } else {
        return state.map((x) => (x.id === product.id ? { ...x, qty: x.qty - 1 } : x));
      }
    default:
      return state;
  }
};

export default minicart;
