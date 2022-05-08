import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Loginer } from "../store/Actions/UserAction";
import Lottie from "react-lottie";
import animation from "../access/95530-password.json";
import { FaEnvelope, FaEye, FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

function User() {
  const [emailV, setEmailV] = useState("");
  const [passwordV, setPasswordV] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("form"));
    const result = await fetch("http://127.0.0.1:5000/api/v0/user", {
      method: "POST",
      body: form,
    });
    const res = await result.json();
    setPasswordV("");
    setEmailV("");
    if (res.msg == "this email was not existing in our server") {
      setEmailV(res.msg);
    } else if (res.msg == "password wrong") {
      setPasswordV(res.msg);
    }

    if (res.con) {
      dispatch(Loginer(res.result));
      nav(`/contact`);
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

  useEffect(() => {
    dispatch(Loginer([]));
  }, []);
  return (
    <div className="w-full min-h-[100vh]">
      <div className="grid grid-cols-12 min-h-[100vh]">
        <div className="col-span-12 lg:col-span-6">
          <div className="w-[90%] md:w-[50%] lg:w-[80%] xl:w-[60%] 2xl:w-[50%] mx-auto py-[25%]">
            <h1 className="text-4xl font-semibold font-['Lato']">
              Start Create and Share Your Contact
            </h1>

            <p className="text-gray-400 my-5">
              You have no account?
              <Link to={"/register"}>
                <span className="text-red-400 cursor-pointer"> Register</span>
              </Link>
            </p>
            <form className="space-y-8" onSubmit={handleSubmit} id="form">
              <div>
                <label htmlFor="email" className="LabelText">
                  Email Address
                </label>
                <div className="login duration-200 hover:ring-red-400 hover:border-red-400 flex space-x-3 items-center">
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
              <div>
                <label htmlFor="email" className="LabelText ">
                  Password
                </label>
                <div className="login duration-200 hover:ring-red-400 hover:border-red-400 flex space-x-3 items-center">
                  <FaLock className="text-gray-300" />
                  <input
                    type={show ? "text" : "password"}
                    className="w-full outline-0"
                    placeholder="enter your valid password"
                    name="password"
                    id="password"
                    onChange={() => {
                      setPasswordV("");
                    }}
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
                {passwordV !== "" && (
                  <p className="text-red-500">{passwordV}</p>
                )}
              </div>
              <div>
                <input
                  type="submit"
                  value={"Login"}
                  className="px-2 w-full  cursor-pointer py-2 bg-red-400 text-white rounded float-right ml-3"
                />
              </div>
              <div className="clear-both" />
            </form>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-6 bg-red-400">
          <div className="xl:py-[15%] lg:py-4 xl:w-full">
            <Lottie options={defaultOption} width="500px" height="500px" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
