import User from "../access/userLogo.png";
import { BiImageAdd } from "react-icons/bi";
import { FaMinus, FaPlus, FaStickyNote, FaUser } from "react-icons/fa";
import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "../store/Actions/DataAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Defender from "./Helper/Defender";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";
function AddContact() {
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [src, setSrc] = useState("");
  const [ani, setAni] = useState(false);
  const user = useSelector((state) => state.Login);
  const [count, setCount] = useState([{ id: 1 }]);

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
    console.log(res);
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

  const handleAddPhone = (e) => {
    e.preventDefault();
    const obj = { id: uuid() };
    setCount((prevState) => [...prevState, obj]);
  };

  const handleRemovePhone = (e) => {
    setCount((prevState) => prevState.filter((i) => i.id !== e));
  };

  return createPortal(
    <Defender>
      <div className="w-[100%] min-h-[100vh] flex items-center absolute top-0 bg-[#000000aa] backdrop-blur z-[1000] mx-auto ">
        <motion.div
          variants={ani ? formClose : form}
          initial="hidden"
          animate="visible"
          className="rounded w-full sm:w-fit px-2 py-3 2xl:px-3 2xl:py-5 mx-auto bg-white shadow border bg-[#DAE1EF] flex flex-col"
        >
          <h1 className="font-semibold font-['lato'] text-2xl">Add Contact</h1>
          <div>
            <div className="w-full md:w-[50%] rounded-[100%] mx-auto my-3">
              <img
                src={src === "" ? User : src}
                alt="img"
                className="rounded-[100%] mx-auto object-contain w-[200px] h-[200px] cursor-pointer"
                onClick={() => {
                  document.getElementById("file").click();
                }}
              />
            </div>

            <form onSubmit={handleSubmit} id="form" className="space-y-3">
              <div className="hidden">
                <div className="flex items-center">
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

              {/*name*/}
              <div className="">
                <label htmlFor="name">Enter Name</label>
                <div className="flex flex-wrap space-y-5 sm:space-y-0 sm:space-x-3">
                  <div className="w-full sm:w-fit">
                    <input
                      type="text"
                      name="FirstName"
                      className="px-2 py-2 w-full  outline-0 border border-gray-300 rounded duration-300 focus:ring-blue-500 focus:border-blue-500"
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
                    className="form rounded duration-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Email"
                  />
                </div>
              </div>
              {count.map((i, inx) => (
                <div key={inx}>
                  <div className="flex items-center">
                    <AiFillPhone />
                    <label htmlFor="name">Phone {inx + 1}</label>
                  </div>
                  <div className="space-y-5">
                    <div className="flex justify-between form rounded duration-300 focus:ring-blue-500 focus:border-blue-500 bg-white">
                      <input
                        type="number"
                        name={`phone ${inx + 1}`}
                        className=" outline-0"
                        placeholder={`phone ${inx + 1}`}
                      />
                      <div className="space-x-3">
                        <button onClick={handleAddPhone}>
                          <FaPlus />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemovePhone(i.id);
                          }}
                        >
                          <FaMinus />
                        </button>
                      </div>
                    </div>
                    {phone !== "" && (
                      <p className="text-red-600 text-sm">{phone}</p>
                    )}
                  </div>
                </div>
              ))}
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

export default AddContact;
