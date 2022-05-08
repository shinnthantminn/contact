import user from "../access/userLogo.png";
import { Link } from "react-router-dom";

function Result({ data }) {
  return (
    <Link to={"/detail/contact"} state={{ data }}>
      <div className="border w-full lg:w-[50%] mx-auto py-2 px-2 shadow my-5">
        <div className="flex flex-row space-x-3 items-center justify-around">
          <div>
            <img
              className="object-cover  w-14"
              src={
                data.image === undefined
                  ? user
                  : `http://localhost:5000/upload/${data.image}`
              }
              alt="img"
            />
          </div>
          <div>
            <p>name</p>
            <p>{data.FirstName + " " + data.LastName}</p>
          </div>
          <div>
            <p>Phone</p>
            <p>{data.phone}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Result;
