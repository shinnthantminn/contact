import { useDispatch, useSelector } from "react-redux";
import { Add } from "../store/Actions/DataAction";
import { useEffect } from "react";
import InnerTrash from "./InnerTrash";
import { NonSelection } from "../store/Actions/SelectorAction";
import Defender from "./Helper/Defender";

function Trash() {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.Data);
  const user = useSelector((state) => state.Login);
  const handleFetch = async () => {
    const data = await fetch(`http://127.0.0.1:5000/api/v0/contact/byUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const res = await data.json();
    const item = res.result.filter((i) => i.noTrash !== false);
    dispatch(Add(item));
  };
  const select = useSelector((state) => state.Select);

  useEffect(() => {
    if (user.length !== 0) {
      handleFetch();
    }
  });

  const handleMutiRecover = () => {
    select.map(async (i) => {
      let formData = new FormData();
      formData.append("noTrash", "false");
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
      dispatch(Add(item));
      dispatch(NonSelection());
    });
  };

  const handleMutiDele = () => {
    select.map(async (i) => {
      const result = await fetch(`http://127.0.0.1:5000/api/v0/contact/${i}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const res = await result.json();
      const item = res.result.filter((i) => i.noTrash === false);
      dispatch(Add(item));
      dispatch(NonSelection());
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
                onClick={handleMutiRecover}
                className="px-1 rounded shadow py-1 text-white bg-yellow-500"
              >
                Recover
              </button>
              <button
                onClick={handleMutiDele}
                className="px-1 rounded shadow py-1 text-white bg-red-500"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="mb-10">
              <h1 className="text-3xl">Trash ({Data.length})</h1>
            </div>
          )}

          <div>
            {Data.map((i) => (
              <InnerTrash data={i} key={i._id} />
            ))}
          </div>
        </div>
      </div>
    </Defender>
  );
}

export default Trash;
