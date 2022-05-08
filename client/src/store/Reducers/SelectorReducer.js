const SelectorReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "select":
      return (state = [...state, payload]);
    case "done":
      return (state = []);
    case "rm":
      return (state = state.filter((i) => i !== payload));
    default:
      return state;
  }
};

export default SelectorReducer;
