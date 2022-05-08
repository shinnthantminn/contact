import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import User from "../access/userLogo.png";
import { BiImageAdd } from "react-icons/bi";
import { FaStickyNote, FaUser } from "react-icons/fa";
import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";
import { useSelector } from "react-redux";
import Defender from "./Helper/Defender";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function EditContact() {
  const { state } = useLocation();
  const user = useSelector((state) => state.Login);
  const [ani, setAni] = useState(false);
  const [first, setFirst] = useState(state.data.FirstName);
  const [last, setLast] = useState(state.data.LastName);
  const [email, setEmail] = useState(state.data.email);
  const [note, setNote] = useState(state.data.Note);
  const [phNo, setPhNo] = useState(state.data.phone);
  const [src, setSrc] = useState("");
  const [photo, setPhoto] = useState("");
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("form"));
    const result = await fetch(
      `http://127.0.0.1:5000/api/v0/contact/${state.data._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: form,
      }
    );
    const res = await result.json();
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
      setAni(true);
      setTimeout(() => {
        window.history.back();
      }, 400);
    }
  };

  useEffect(() => {
    if (src === "" && state.data.image === undefined) {
      setPhoto(User);
    } else if (src === "") {
      setPhoto(`http://localhost:5000/upload/${state.data.image}`);
    } else {
      setPhoto(src);
    }
  }, [src]);

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

  const form = {
    hidden: {
      y: -1000,
    },
    visible: {
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 12,
      },
    },
  };

  const formClose = {
    hidden: {
      y: 0,
    },
    visible: {
      x: 0,
      y: -1000,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 12,
      },
    },
  };

  return createPortal(
    <Defender>
      <div className="w-[100%] min-h-[100vh] flex items-center absolute top-0 bg-[#000000aa] backdrop-blur z-[1000] mx-auto ">
        <motion.div
          variants={ani ? formClose : form}
          initial="hidden"
          animate="visible"
          className="rounded sm:w-fit px-2 py-3 2xl:px-3 2xl:py-5 mx-auto bg-white shadow border bg-[#DAE1EF] flex flex-col"
        >
          <h1 className="font-semibold font-['lato'] text-2xl">Edit Contact</h1>
          <div>
            <div className="w-full md:w-[50%] rounded-[100%] mx-auto my-3">
              <img
                src={photo}
                alt="img"
                onClick={() => {
                  document.getElementById("file").click();
                }}
                className="rounded-[100%] mx-auto object-contain w-[200px] h-[200px] cursor-pointer"
              />
            </div>

            <form onSubmit={handleSubmit} id="form" className="space-y-3">
              <div className="hidden">
                <div className="flex items-center mb-3">
                  <BiImageAdd />
                  <label htmlFor="file">Image</label>
                </div>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleFile}
                />
              </div>

              <div className="">
                <label htmlFor="name">Enter Name</label>
                <div className="flex flex-wrap space-y-5 sm:space-y-0 sm:space-x-3">
                  <div className="w-full sm:w-fit">
                    <input
                      type="text"
                      name="FirstName"
                      className="px-2 py-2 w-full  outline-0 border border-gray-300 rounded duration-300 focus:ring-blue-500 focus:border-blue-500"
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                      placeholder="First Name"
                    />
                    {firstName !== "" && (
                      <p className="text-red-600 text-sm">{firstName}</p>
                    )}
                  </div>
                  <div className="w-full sm:w-fit">
                    <input
                      type="text"
                      name="LastName"
                      className="px-2 py-2 w-full  outline-0 border border-gray-300 rounded duration-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Last Name"
                      value={last}
                      onChange={(e) => setLast(e.target.value)}
                    />
                    {lastName !== "" && (
                      <p className="text-red-600 text-sm">{lastName}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="flex items-center">
                  <AiTwotoneMail />
                  <label htmlFor="name">Email</label>
                </div>
                <div className="">
                  <input
                    type="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form rounded duration-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="">
                <div className="flex items-center">
                  <AiFillPhone />
                  <label htmlFor="name">Phone</label>
                </div>
                <div className="space-y-5">
                  <input
                    type="number"
                    name="phone"
                    value={phNo}
                    onChange={(e) => setPhNo(e.target.value)}
                    className="form rounded duration-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Phone"
                  />
                  {phone !== "" && (
                    <p className="text-red-600 text-sm">{phone}</p>
                  )}
                </div>
              </div>

              <div className="">
                <div className="flex items-center">
                  <FaStickyNote />
                  <label htmlFor="name">Note</label>
                </div>
                <div className="space-y-5">
                  <textarea
                    type="text"
                    name="Note"
                    cols="3"
                    rows="5"
                    className="form duration-300 focus:ring-blue-500 focus:border-blue-500"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Note"
                  />
                </div>
              </div>

              <div className=" space-x-3 float-right pt-5 pb-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("form").reset();
                    setSrc("");
                    setFirstName("");
                    setLastName("");
                    setPhone("");
                    setAni(true);
                    setTimeout(() => {
                      window.history.back();
                    }, 400);
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
        </motion.div>
      </div>
    </Defender>,
    document.getElementById("model")
  );
}

export default EditContact;
