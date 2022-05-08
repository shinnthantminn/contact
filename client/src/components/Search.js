import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Searching } from "../store/Actions/SearchAction";
import Result from "./Result";
import Defender from "./Helper/Defender";

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

  return (
    <Defender>
      <div className="w-full lg:w-[80%]">
        <div className="w-[80%] mx-auto space-y-5">
          <div className="w-full sm:w-[80%] space-x-3 mx-auto bg-[#F1F3F4] px-2 py-3 rounded-2xl flex items-center">
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
      </div>
    </Defender>
  );
}

export default Search;
