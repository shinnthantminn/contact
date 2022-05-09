const isTokenExpired = (token) =>
  Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;

let initialState = [];

const data = sessionStorage.getItem("token");
if (data) {
  const user = JSON.parse(data);
  const exp = isTokenExpired(user.token);
  if (!exp) {
    initialState = user;
  }
}

const UserReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case "login":
      if (payload.length !== 0) {
        const exp = isTokenExpired(payload.token);
        console.log("i am no exp");
        console.log("i am no exp");
        if (!exp) {
          console.log("set Token");
          const data = JSON.stringify(payload);
          sessionStorage.setItem("token", data);
        }
      }
      if (sessionStorage.getItem("token")) {
        const data = JSON.parse(sessionStorage.getItem("token"));
        if (data) {
          console.log("set user");
          state = data;
        } else {
          console.log("set payload");
          state = payload;
        }
      }
      return state;
    default:
      return state;
  }
};

export default UserReducers;
