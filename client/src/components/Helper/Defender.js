import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Toggle } from "../../store/Actions/ToggleAction";

function Defender({ children }) {
  const dispatch = useDispatch();
  const isTokenExpired = (token) =>
    Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;
  const user = useSelector((state) => state.Login);

  let exp;
  if (sessionStorage.getItem("token")) {
    const data = JSON.parse(sessionStorage.getItem("token"));
    exp = isTokenExpired(data.token);
    if (exp) {
      sessionStorage.removeItem("token");
      dispatch(Toggle());
    }
  }

  if (exp || !sessionStorage.getItem("token")) {
    return <Navigate to={"/"} replace />;
  } else return children;
}

export default Defender;
