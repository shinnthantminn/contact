import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Loginer } from "../store/Actions/UserAction";
import animation from "../access/38435-register.json";
import Lottie from "react-lottie";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {
  const [emailV, setEmailV] = useState("");
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("form"));
    const result = await fetch("http://127.0.0.1:5000/api/v0/user/register", {
      method: "POST",
      body: form,
    });
    const res = await result.json();
    console.log(res);
    if (res.msg == "this email was existing in our server") {
      setEmailV(res.msg);
    }

    if (res.con) {
      nav(`/`);
    }
  };
  const defaultOption = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full min-h-[100vh]">
      <div className="grid grid-cols-12 min-h-[100vh]">
        <div className="col-span-6 hidden lg:block bg-violet-400 py-[9%] xl:py-[15%] 2xl:py-[20%]">
          <Lottie options={defaultOption} width="500px" height="500px" />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="w-[90%] md:w-[60%] lg:w-[80%] 2xl:w-[50%] mx-auto lg:py-[9%] py-[15%] lg:py-0 xl:py-[20%]">
            <h1 className="font-['Lato'] text-5xl font-semibold">
              Get's Start
            </h1>
            <p className=" text-gray-400 my-5">
              Already have an Account ??
              <Link to={"/"}>
                <span className="text-violet-500"> Login</span>
              </Link>
            </p>
            <form className="space-y-8" onSubmit={handleSubmit} id="form">
              <div>
                <label htmlFor="name" className="LabelText">
                  Enter Your Name
                </label>
                <div className="login duration-200 hover:ring-violet-400 hover:border-violet-400 flex space-x-3 items-center">
                  <FaUser className="text-gray-300" />
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="w-full outline-0"
                    name="name"
                    id="name"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="email" className="LabelText">
                    Email Address
                  </label>
                  <div className="login duration-200 hover:ring-violet-400 hover:border-violet-400 flex space-x-3 items-center">
                    <FaEnvelope className="text-gray-300" />
                    <input
                      type="Email"
                      placeholder="exp:admin@gmail.com"
                      className="w-full outline-0"
                      name="email"
                      id="email"
                      onChange={() => {
                        setEmailV("");
                      }}
                    />
                  </div>
                  {emailV !== "" && <p className="text-red-500">{emailV}</p>}
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="password" className="LabelText">
                    Enter Password
                  </label>
                  <div className="login duration-200 hover:ring-violet-400 hover:border-violet-400 flex space-x-3 items-center">
                    <FaLock className="text-gray-300" />
                    <input
                      type={show ? "text" : "password"}
                      className="w-full outline-0"
                      placeholder="enter your valid password"
                      name="password"
                      id="password"
                    />
                    <button
                      className="text-gray-300"
                      onClick={(e) => {
                        e.preventDefault();
                        setShow((prevState) => !prevState);
                      }}
                    >
                      {show ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <input
                  type="submit"
                  value={"Register"}
                  className="px-2 py-2 w-full bg-violet-500 cursor-pointer text-white rounded float-right ml-3"
                />
              </div>
              <div className="clear-both" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
