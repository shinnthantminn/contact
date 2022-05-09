import { BiLeftArrow, BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Searching } from "../store/Actions/SearchAction";
import Result from "./Result";
import Defender from "./Helper/Defender";
import { createPortal } from "react-dom";

function Search() {
  const [state, setState] = useState("");
  const Item = useSelector((state) => state.Search);
  const data = useSelector((state) => state.Data);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    const finder = data.filter((i) => i.FirstName.includes(state));
    if (finder !== undefined) {
      dispatch(Searching(finder));
    }
  };

  useEffect(() => {
    handleSearch();
    if (state === "") {
      dispatch(Searching([]));
    }
  }, [state]);

  return createPortal(
    <div className="w-[100%] min-h-[100vh] flex absolute top-0 bg-[#000000aa] backdrop-blur z-[1000] mx-auto ">
      <div className="w-[80%] lg:w-[60%] mx-auto space-y-5">
        <button
          onClick={() => {
            window.history.back();
          }}
          className="mt-5 px-2 py-2 bg-blue-500 rounded text-white"
        >
          <BiLeftArrow />
        </button>
        <div className="w-full mt-16 sm:w-[80%] space-x-3 mx-auto bg-[#F1F3F4] px-2 py-3 rounded-2xl flex items-center">
          <BiSearch className="ml-2" />
          <input
            type="text"
            className="w-full bg-[#F1F3F4] outline-0"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-[80%] mx-auto ">
          {Item.map((i) => (
            <Result key={i._id} data={i} />
          ))}
        </div>
      </div>
    </div>,
    document.getElementById("model")
  );
}

export default Search;
