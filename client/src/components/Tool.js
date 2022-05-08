import { Link, Outlet, useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoMdTrash } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

function Tool() {
  const toggle = useSelector((state) => state.Toggle);
  const nav = useNavigate();

  return (
    <div className="flex flex-wrap font-['Montserrat'] h-fit w-[98%] mx-auto">
      <div
        className={
          toggle
            ? "lg:sticky top-[100px] duration-500 w-[60%] min-h-[100vh] lg:min-h-fit py-5 left-[-600px] lg:left-0 lg:p-0 border-t-2 border-r-2 bg-white lg:border-0 lg:h-fit fixed lg:w-[20%]"
            : "lg:sticky top-[100px] duration-500 w-[60%] lg:w-[20%] min-h-[80vh]  py-5  lg:p-0 lg:left-0 border-t-2 border-r-2 bg-white lg:border-0 lg:h-fit left-0 fixed  lg:left-[-400px] lg:translate-x-[-1000px] lg:w-[0%]"
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
            <Link to="contact">
              <div className="flex items-center space-x-3 border shadow py-3 px-2 w-[80%]">
                <FaUser />
                <h1>Contact</h1>
              </div>
            </Link>
            <Link to={"trash"}>
              <div className="flex items-center space-x-3 border shadow py-3 px-2 w-[80%]">
                <IoMdTrash />
                <h1>Trash</h1>
              </div>
            </Link>
            <button
              onClick={() => nav("/")}
              className="flex items-center space-x-3 border shadow py-3 px-2 w-[80%]"
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
