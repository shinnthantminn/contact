import User from "../access/user.png";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "../store/Actions/DataAction";
import { Link } from "react-router-dom";
import { useEffect, useState, Fragment, useRef } from "react";
import { remover, Selection } from "../store/Actions/SelectorAction";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";

function InnerContact({ data }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Login);
  const [isChecked, setIsChecked] = useState(false);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const handleTrash = async () => {
    let formData = new FormData();
    formData.append("noTrash", "true");
    const result = await fetch(
      `http://127.0.0.1:5000/api/v0/contact/byUser/${data._id}`,
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
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      dispatch(Selection(data._id));
    } else {
      dispatch(remover(data._id));
    }
  }, [isChecked]);

  return (
    <div className="grid my-5 grid-cols-6 md:grid-cols-12 lg:grid-cols-10 duration-100 rounded hover:bg-gray-200 px-2 py-2">
      <Link
        to="/"
        to="/detail/contact"
        state={{ data }}
        className="col-span-4 md:col-span-8"
      >
        <div className="grid grid-cols-8">
          <div className="col-span-4 lg:col-span-2 flex">
            <div>
              <h1>Name</h1>
              <div className="flex items-center space-x-3">
                <img
                  className="w-[10%]"
                  src={
                    data.image === undefined
                      ? User
                      : `http://localhost:5000/upload/${data.image}`
                  }
                  alt=""
                />
                <p className="truncate w-[50%]">
                  {data.FirstName + " " + data.LastName}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:col-span-4 lg:col-span-2">
            <div>
              <h1>Phone</h1>
              <p>{data.phone[0]}</p>
            </div>
          </div>
          <div className="hidden lg:block col-span-4">
            <div>
              <h1>email</h1>
              <p>
                {data.email === "" ? "No Email in This Contact" : data.email}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <div className="col-span-2 md:col-span-4 lg:col-span-2">
        <div className="text-2xl h-full text-white flex items-center space-x-3 float-right">
          <input type="checkbox" checked={isChecked} onChange={handleChecked} />
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md   px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                <BsThreeDotsVertical />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-40 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/" to={"/edit/contact"} state={{ data }}>
                        <div
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 cursor-pointer"
                              : "text-gray-700 cursor-pointer",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Edit
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={handleTrash}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900 cursor-pointer"
                            : "text-gray-700 cursor-pointer",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Delete
                      </div>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to={"/share"} state={{ data }}>
                        <div
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          send
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to={"/copy"} state={{ data }}>
                        <div
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          share
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default InnerContact;
