import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "../store/Actions/DataAction";
import InnerContact from "./InnerContact";
import { NonSelection, Selection } from "../store/Actions/SelectorAction";
import Defender from "./Helper/Defender";
import { Link } from "react-router-dom";

function Contact() {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.Data);
  const user = useSelector((state) => state.Login);
  console.log(user);
  const handleFetch = async () => {
    const data = await fetch(`http://127.0.0.1:5000/api/v0/contact/byUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const res = await data.json();
    const item = res.result.filter((i) => i.noTrash === false);
    dispatch(Add(item));
  };
  const select = useSelector((state) => state.Select);

  useEffect(() => {
    if (user.length !== 0) {
      handleFetch();
    }
  }, []);

  const handleMultiDelete = () => {
    select.map(async (i) => {
      let formData = new FormData();
      formData.append("noTrash", "true");
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
      const item = res.result.filter((i) => i.noTrash === false);
      console.log(item);
      dispatch(Add(item));
      dispatch(NonSelection());
      console.log(select);
    });
  };

  return (
    <Defender>
      <div className="lg:w-[80%] mx-auto ">
        <div>
          {select.length !== 0 ? (
            <div className="flex items-center space-x-3">
              <p>Select {select.length} </p>
              <button
                onClick={handleMultiDelete}
                className="px-1 rounded shadow py-1 text-white bg-red-500"
              >
                Delete
              </button>
              <Link to={"/share"} state={{ select }}>
                <button className="px-1 rounded shadow py-1 text-white bg-violet-500">
                  Share
                </button>
              </Link>
            </div>
          ) : (
            <div className="mb-10">
              <h1 className="text-3xl">Contact ({Data.length})</h1>
            </div>
          )}

          <div>
            {Data.map((i) => (
              <InnerContact data={i} key={i._id} />
            ))}
          </div>
        </div>
      </div>
    </Defender>
  );
}

export default Contact;
