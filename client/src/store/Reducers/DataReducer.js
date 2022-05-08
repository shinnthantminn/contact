const DataReducer = (state = [], action) => {
  switch (action.type) {
    case "add":
      return [...action.payload];
    default:
      return state;
  }
};

export default DataReducer;
