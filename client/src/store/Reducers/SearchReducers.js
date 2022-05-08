const SearchReducers = (state = [], { type, payload }) => {
  switch (type) {
    case "search":
      state = payload;
    default:
      return state;
  }
};

export default SearchReducers;
