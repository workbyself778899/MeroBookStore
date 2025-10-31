import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../src/components/Loader/Loader";
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SeeUserData from "./SeeUserData";

const AllOrder = () => {
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const [AllOrders, setAllOrders] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch orders once on mount
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://shop-1-3t0g.onrender.com/api/v1/get-all-orders`,
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, []);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = AllOrders[i]?._id;
    try {
      const response = await axios.put(
        `https://shop-1-3t0g.onrender.com/api/v1/updata-status/${id}`,
        Values,
        { headers }
      );

      // Update local state immediately for instant UI update
      const updatedOrders = [...AllOrders];
      updatedOrders[i].status = Values.status;
      setAllOrders(updatedOrders);
      setOptions(-1);
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error updating status");
    }
  };

  if (!AllOrders)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="min-h-screen p-4 bg-gray-100 text-gray-800">
        <h1 className="text-3xl md:text-5xl font-semibold mb-8">
          All Orders
        </h1>

        {/* Table Header */}
        <div className="hidden md:flex bg-white shadow rounded-lg py-2 px-4 font-semibold text-gray-700">
          <div className="w-[3%] text-center">Sr.</div>
          <div className="w-[22%]">Books</div>
          <div className="w-[45%]">Descriptions</div>
          <div className="w-[9%]">Price</div>
          <div className="w-[16%]">Status</div>
          <div className="w-[5%] text-center">
            <FaUserLarge />
          </div>
        </div>

        {/* Orders */}
        {AllOrders.map((items, i) => (
          <div
            key={items._id}
            className="flex flex-col md:flex-row bg-white shadow rounded-lg my-3 p-4 gap-2 md:gap-4 hover:shadow-lg transition"
          >
            <div className="md:w-[3%] text-center">{i + 1}</div>
            <div className="md:w-[22%]">
              <Link
                to={`/view-book-details/${items.book?._id}`}
                className="text-blue-600 hover:underline"
              >
                {items.book?.title}
              </Link>
            </div>
            <div className="md:w-[45%] hidden md:block">
              {items.book?.desc.slice(0, 50)}...
            </div>
            <div className="md:w-[9%]">Rs. {items.book?.price}</div>
            <div className="md:w-[16%]">
              <button
                className="font-semibold hover:scale-105 transition"
                onClick={() => setOptions(i)}
              >
                <span
                  className={
                    items.status === "Order Placed"
                      ? "text-yellow-500"
                      : items.status === "Canceled"
                        ? "text-red-500"
                        : "text-green-500"
                  }
                >
                  {items.status}
                </span>
              </button>

              {Options === i && (
                <div className="mt-2">
                  <select
                    className="border border-gray-300 rounded p-1"
                    value={Values.status}
                    onChange={change}
                  >
                    {["Order Placed", "Out for delivery", "Delivered", "Canceled"].map(
                      (status, idx) => (
                        <option value={status} key={idx}>
                          {status}
                        </option>
                      )
                    )}
                  </select>
                  <button
                    className="ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    onClick={() => submitChanges(i)}
                  >
                    <FaCheck />
                  </button>
                </div>
              )}
            </div>
            <div className="md:w-[5%] text-center">
              <button
                className="text-xl hover:text-orange-500"
                onClick={() => {
                  setuserDiv("fixed");
                  setuserDivData(items.user);
                }}
              >
                <IoOpenOutline />
              </button>
            </div>
          </div>
        ))}
      </div>

      {userDivData && (
        <SeeUserData
          userDiv={userDiv}
          userDivData={userDivData}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrder;
