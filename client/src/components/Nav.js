import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "../store/Actions/ToggleAction";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Nav() {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [exp, setExp] = useState(false);
  const toggle = useSelector((state) => state.Toggle);
  const isTokenExpired = (token) =>
    Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;
  const user = useSelector((state) => state.Login);

  const handleMenu = () => {
    dispatch(Toggle());
  };

  const fun = async () => {
    const info = await JSON.parse(sessionStorage.getItem("token"));
    if (info === null) {
      await setData(null);
    } else {
      const check = isTokenExpired(info.token);
      if (check) {
        await setExp(true);
      }
      await setData(info);
    }
  };

  useEffect(() => {
    fun();
  }, [toggle]);

  if (exp || data === null) {
    return <div />;
  } else
    return (
      <div className="py-3 mb-8 font-['Montserrat'] shadow sticky top-0 z-40 bg-white">
        <div className="flex items-center space-x-3 justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="text-2xl px-3 py-3 rounded-[100%]  duration-300 hover:bg-gray-200"
              onClick={handleMenu}
            >
              <FiMenu />
            </div>

            <div className="hidden sm:flex items-center space-x-3">
              {user.image === undefined ? (
                <div className="text-xl text-white px-3 py-3 rounded-[100%] bg-blue-500">
                  <FaUser />
                </div>
              ) : (
                <div className="w-[45px] rounded-[100%]">
                  <img
                    className="object-cover rounded-[100%]"
                    src={`http://127.0.0.1:5000/upload/${user.image}`}
                    alt=""
                  />
                </div>
              )}
              <h1 className="text-2xl font-semibold text-gray-600 font-['Montserrat']">
                Contact
              </h1>
            </div>
          </div>
          <div>
            <Link to={"/search"}>
              <div className="px-2 rounded mr-5 text-2xl cursor-pointer py-2 bg-blue-500 text-white">
                <BiSearch />
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default Nav;
