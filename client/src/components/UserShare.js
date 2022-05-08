import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Defender from "./Helper/Defender";
import { useDispatch, useSelector } from "react-redux";
import { NonSelection } from "../store/Actions/SelectorAction";
import { Add } from "../store/Actions/DataAction";

function UserShare() {
  const { state } = useLocation();
  const selection = useLocation();
  const multiSelect = selection.state.select;
  console.log("i am multi share", multiSelect);
  console.log("i am single share", state.data);
  const user = useSelector((state) => state.Login);
  const nav = useNavigate();
  const select = useSelector((state) => state.Select);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const send = async (item, owner, multi) => {
    let formData = new FormData();
    formData.append("owner", owner._id);
    if (item === undefined) {
      for (const i of multi) {
        const result = await fetch(
          `http://127.0.0.1:5000/api/v0/contact/byUser/${i}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            body: formData,
          }
        );
        const res = await result.json();
        const contact = res.result.filter((i) => i.noTrash === false);
        dispatch(Add(contact));
        nav("/contact");
      }
    } else {
      const result = await fetch(
        `http://127.0.0.1:5000/api/v0/contact/byUser/${item._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );
      const res = await result.json();
      const contact = res.result.filter((i) => i.noTrash === false);
      dispatch(Add(contact));
      nav("/contact");
    }
  };

  const fetchingData = async () => {
    const form = new FormData(document.getElementById("form"));
    const result = await fetch("http://127.0.0.1:5000/api/v0/user/byEmail", {
      method: "POST",
      body: form,
    });
    const res = await result.json();
    if (res.result[0] === undefined) {
      setErr("no user with that email");
      return;
    }
    await send(state.data, res.result[0], multiSelect);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchingData();
  };

  return (
    <Defender>
      <div className="lg:w-[80%] mx-auto ">
        <div className="w-[400px] pb-6 space-y-10 mx-auto px-5 py-2 border shadow">
          <h1 className="text-center text-2xl font-semibold">Share</h1>
          <form className="space-y-8" id="form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xl ">
                Email
              </label>
              <input
                type="Email"
                className={err === "" ? "login" : "login border-red-500"}
                name="email"
                id="email"
              />
              {err !== "" && <p className="text-red-500">{err}</p>}
            </div>
            <div>
              <input
                type="submit"
                value={"Send"}
                className="px-2 py-2 bg-blue-500 text-white rounded float-right ml-3"
              />
              <input
                type="submit"
                value={"Cancel"}
                className="px-2 py-2 bg-red-500 text-white rounded float-right"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("form").reset();
                }}
              />
            </div>
            <div className="clear-both" />
          </form>
        </div>
      </div>
    </Defender>
  );
}

export default UserShare;
