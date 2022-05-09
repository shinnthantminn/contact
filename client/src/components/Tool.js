import { Link, Outlet, useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { FaTimes, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoMdTrash } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import Defender from "./Helper/Defender";
import { Toggle } from "../store/Actions/ToggleAction";

function Tool() {
  const toggle = useSelector((state) => state.Toggle);
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-wrap font-['Montserrat'] h-fit w-[98%] mx-auto"
      onResize={() => {
        console.log("hello");
      }}
    >
      <div
        className={
          toggle
            ? "lg:sticky z-[10000] lg:z-0 top-0 lg:top-[100px] duration-500 w-[60%] min-h-[100vh] lg:min-h-fit py-5 left-[-600px] lg:left-0 lg:p-0 border-t-2 border-r-2 bg-white lg:border-0 lg:h-fit fixed lg:w-[20%]"
            : "lg:sticky z-[10000] lg:z-0 top-0 lg:top-[100px] duration-500 w-[60%] lg:w-[20%] min-h-[100vh] lg:min-h-[80vh]  py-5  lg:p-0 lg:left-0 border-t-2 border-r-2 bg-white lg:border-0 lg:h-fit left-0 fixed  lg:left-[-400px] lg:translate-x-[-1000px] lg:w-[0%]"
        }
      >
        <div>
          <Link to={"/add/category"}>
            <div className="card duration-300 hover:shadow mb-10">
              <BiPlus className="text-2xl" />
              <h1 className="text-sm">Create Contact</h1>
            </div>
          </Link>

          <div>
            <div className="flex justify-end mb-5 mx-3">
              <button
                className="lg:hidden"
                onClick={() => {
                  dispatch(Toggle());
                }}
              >
                <FaTimes />
              </button>
            </div>
            <Link to="contact">
              <div className="flex items-center space-x-3 border lg:shadow py-3 px-2 lg:w-[80%]">
                <FaUser />
                <h1>Contact</h1>
              </div>
            </Link>
            <Link to={"trash"}>
              <div className="flex items-center space-x-3 border lg:shadow py-3 px-2 lg:w-[80%]">
                <IoMdTrash />
                <h1>Trash</h1>
              </div>
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem("token");
                dispatch(Toggle());
                nav("/");
              }}
              className="flex items-center space-x-3 border lg:shadow py-3 px-2 w-[100%] lg:w-[80%]"
            >
              <FiLogOut />
              <h1>Logout</h1>
            </button>
          </div>
        </div>
      </div>
      <Link to={"/add/category"}>
        <div className="fixed lg:hidden px-3 py-3 text-white rounded-[100%] bg-blue-500 bottom-10 right-10">
          <BiPlus className="text-2xl" />
        </div>
      </Link>
      <Outlet />
    </div>
  );
}

export default Tool;
