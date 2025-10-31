import axios from "axios";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { FaFrownOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://shop-1-3t0g.onrender.com/api/v1/get-order-history",
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Loader */}
      {!OrderHistory && (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* No Orders */}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] flex flex-col items-center justify-center text-gray-600">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">
            No Order History
          </h1>
          <FaFrownOpen className="text-6xl text-gray-400" />
        </div>
      )}

      {/* Orders List */}
      {OrderHistory && OrderHistory.length > 0 && (
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-700 mb-6">
            Your Order History
          </h1>

          {/* Table Header (Hidden on small screens) */}
          <div className="hidden md:flex bg-orange-500 text-white font-semibold rounded-lg py-3 px-4">
            <div className="w-[5%] text-center">Sr.</div>
            <div className="w-[20%]">Book</div>
            <div className="w-[40%]">Description</div>
            <div className="w-[10%]">Price</div>
            <div className="w-[15%]">Status</div>
            <div className="w-[10%] text-center">Mode</div>
          </div>

          {/* Order Rows */}
          {OrderHistory.map((items, i) => (
            <div
              key={i}
              className="mt-4 bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-start md:items-center md:gap-4 hover:shadow-lg transition"
            >
              {/* Sr */}
              <div className="w-full md:w-[5%] text-gray-600 text-sm text-center mb-2 md:mb-0">
                {i + 1}
              </div>

              {/* Book Title */}
              <div className="w-full md:w-[20%] font-medium text-blue-600 hover:underline">
                <Link to={`/view-book-details/${items.book?._id}`}>
                  {items.book?.title}
                </Link>
              </div>

              {/* Description */}
              <div className="w-full md:w-[40%] text-gray-500 text-sm">
                {items.book?.desc.slice(0, 50)}...
              </div>

              {/* Price */}
              <div className="w-full md:w-[10%] font-semibold text-gray-700">
                Rs. {items.book?.price}
              </div>

              {/* Status */}
              <div className="w-full md:w-[15%] font-semibold">
                {items.status === "Order Placed" ? (
                  <span className="text-yellow-600">{items.status}</span>
                ) : items.status === "Canceled" ? (
                  <span className="text-red-600">{items.status}</span>
                ) : (
                  <span className="text-green-600">{items.status}</span>
                )}
              </div>

              {/* Mode */}
              <div className="hidden md:block w-[10%] text-center text-gray-500 text-sm">
                COD
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
