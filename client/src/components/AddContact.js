import User from "../access/userLogo.png";
import { BiImageAdd } from "react-icons/bi";
import { FaStickyNote, FaUser } from "react-icons/fa";
import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "../store/Actions/DataAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Defender from "./Helper/Defender";
import { createPortal } from "react-dom";

function AddContact() {
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [src, setSrc] = useState("");
  const user = useSelector((state) => state.Login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("form"));
    const result = await fetch(`http://127.0.0.1:5000/api/v0/contact`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: form,
    });
    const res = await result.json();
    console.log(res.msg);
    setFirstName("");
    setLastName("");
    setPhone("");
    if (
      res.msg == '"FirstName" is not allowed to be empty' ||
      res.msg == '"FirstName" length must be at least 3 characters long'
    ) {
      setFirstName(res.msg);
    } else if (
      res.msg == '"LastName" is not allowed to be empty' ||
      res.msg == '"LastName" length must be at least 3 characters long'
    ) {
      setLastName(res.msg);
    } else if (
      res.msg == '"phone" is not allowed to be empty' ||
      res.msg == "this phone was existing in our server"
    ) {
      setPhone(res.msg);
    }
    if (res.con) {
      nav("/contact");
    }
  };

  const handleFile = (e) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        setSrc(reader.result);
      },
      false
    );
    reader.readAsDataURL(e.target.files[0]);
  };
  return createPortal(
    <Defender>
      <div className="w-[100%] min-h-[100vh] absolute top-0 bg-[#0000000aa] z-[1000] mx-auto ">
        <div className="w-[50%] mx-auto bg-white shadow border flex items-center flex-col">
          <h1 className="text-2xl mb-10 font-semibold">Add Contact</h1>
          <div>
            <div className="w-full md:w-[50%] rounded-[100%] mx-auto mb-10">
              <img
                src={src === "" ? User : src}
                alt="img"
                className="rounded object-contain w-[70%] "
              />
            </div>

            <form onSubmit={handleSubmit} id="form" className="space-y-10">
              <div>
                <div className="flex items-center mb-3">
                  <BiImageAdd />
                  <label htmlFor="file">Image</label>
                </div>
                <input type="file" name="file" onChange={handleFile} />
              </div>
              <div className="space-y-3 mt-6">
                <div className="flex items-center">
                  <FaUser />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="space-y-8">
                  <input
                    type="text"
                    name="FirstName"
                    className={
                      firstName == ""
                        ? "broder border-b border-gray-500 w-[100%] lg:w-[80%] outline-0 px-2"
                        : "broder border-b border-red-500 w-[100%] lg:w-[80%] outline-0 px-2"
                    }
                    placeholder="First Name"
                  />
                  {firstName !== "" && (
                    <p className="text-red-600 text-sm">{firstName}</p>
                  )}
                  <input
                    type="text"
                    name="LastName"
                    className={
                      lastName == ""
                        ? "broder border-b border-gray-500 w-[100%] lg:w-[80%] outline-0 px-2"
                        : "broder border-b border-red-500 w-[100%] lg:w-[80%] outline-0 px-2"
                    }
                    placeholder="Last Name"
                  />
                  {lastName !== "" && (
                    <p className="text-red-600 text-sm">{lastName}</p>
                  )}
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="flex items-center">
                  <AiTwotoneMail />
                  <label htmlFor="name">Email</label>
                </div>
                <div className="space-y-5">
                  <input
                    type="Email"
                    name="email"
                    className="broder border-b border-gray-500 w-[100%] lg:w-[80%] outline-0 px-2"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="flex items-center">
                  <AiFillPhone />
                  <label htmlFor="name">Phone</label>
                </div>
                <div className="space-y-5">
                  <input
                    type="number"
                    name="phone"
                    className={
                      phone == ""
                        ? "broder border-b border-gray-500 w-[100%] lg:w-[80%] outline-0 px-2"
                        : "broder border-b border-red-500 w-[100%] lg:w-[80%] outline-0 px-2"
                    }
                    placeholder="phone"
                  />
                  {phone !== "" && (
                    <p className="text-red-600 text-sm">{phone}</p>
                  )}
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="flex items-center">
                  <FaStickyNote />
                  <label htmlFor="name">Note</label>
                </div>
                <div className="space-y-5">
                  <input
                    type="text"
                    name="Note"
                    className="broder border-b border-gray-500 w-[100%] lg:w-[80%] outline-0 px-2"
                    placeholder="Note"
                  />
                </div>
              </div>
              <div className="mt-10 space-x-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("form").reset();
                    setSrc("");
                    setFirstName("");
                    setLastName("");
                    setPhone("");
                  }}
                  className="px-2 py-2 text-white bg-red-500 rounded shadow duration-300 hover:shadow-xl"
                >
                  Cancel
                </button>
                <button className="px-2 py-2 text-white bg-blue-500 rounded shadow duration-300 hover:shadow-xl">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Defender>,
    document.getElementById("model")
  );
}

export default AddContact;
