import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Defender({ children }) {
  const user = useSelector((state) => state.Login);
  if (user.length === 0) {
    return <Navigate to={"/"} />;
  } else return children;
}

export default Defender;
