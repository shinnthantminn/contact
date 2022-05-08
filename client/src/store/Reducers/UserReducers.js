const UserReducers = (state = [], { type, payload }) => {
  switch (type) {
    case "login":
      return (state = payload);
    default:
      return state;
  }
};

export default UserReducers;
