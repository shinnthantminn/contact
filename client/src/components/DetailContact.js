import { Link, useLocation } from "react-router-dom";
import { BsTelephoneFill } from "react-icons/bs";
import user from "../access/userLogo.png";
import Defender from "./Helper/Defender";
import { MdArrowLeft } from "react-icons/md";
import { BiNote } from "react-icons/bi";

function DetailContacts() {
  const { state } = useLocation();

  return (
    <Defender>
      <div className="flex flex-col w-[90%] lg:w-[50%] mx-auto">
        <button
          onClick={() => {
            window.history.back();
          }}
          className="w-fit px-2 py-2 bg-blue-500 text-white rounded mb-10"
        >
          <MdArrowLeft />
        </button>
        <div className="flex flex-col md:flex-row items-center space-x-3">
          <div className="">
            <img
              src={
                state.data.image
                  ? `http://127.0.0.9:5000/upload/${state.data.image}`
                  : user
              }
              alt=""
              width="230px"
            />
          </div>
          <div>
            <p className="text-2xl">
              {state.data.FirstName + " " + state.data.LastName}
            </p>
            <Link to="/edit/contact" state={state}>
              <div className="w-fit px-2 py-1 bg-blue-500 text-white rounded mt-3">
                Edit
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full border rounded px-3 py-5 mt-5 rounded shadow">
          <p className="font-semibold">contact details</p>
          <div className="flex space-x-3 mt-2">
            <BsTelephoneFill />
            <p className="text-blue-500">{state.data.phone}</p>
          </div>
        </div>
        {state.data.Note && (
          <div className="w-full border rounded px-3 py-5 mt-5 rounded shadow">
            <p className="font-semibold">Note</p>
            <div className="flex space-x-3 mt-2">
              <BiNote />
              <p className="text-blue-500">{state.data.Note}</p>
            </div>
          </div>
        )}
      </div>
    </Defender>
  );
}

export default DetailContacts;
