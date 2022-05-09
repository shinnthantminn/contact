const ToggleReducers = (state = false, action) => {
  switch (action.type) {
    case "toggle":
      return (state = !state);
    default:
      return state;
  }
};

export default ToggleReducers;
