import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa6";
import Loader from "../Loader/Loader";
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://shop-1-3t0g.onrender.com/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      `https://shop-1-3t0g.onrender.com/api/v1/add-book-to-favourite`,
      {},
      { headers }
    );
    toast.success(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      `https://shop-1-3t0g.onrender.com/api/v1/add-to-cart`,
      {},
      { headers }
    );
    toast.success(response.data.message);
  };

  const deleteBook = async () => {
    const response = await axios.delete(
      `https://shop-1-3t0g.onrender.com/api/v1/delete-book`,
      { headers }
    );
    toast.success(response.data.message);
    navigate("/all-books");
  };

  return (
    <>
      <ToastContainer />
      {Data ? (
        <div className="px-4 md:px-16 py-10 bg-gray-100 min-h-screen flex flex-col lg:flex-row gap-8">
          {/* Left Box: Image + Buttons */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 lg:p-10 flex flex-col items-center transition hover:shadow-2xl">
              <img
                src={Data.url}
                alt="Book"
                className="h-[60vh] lg:h-[70vh] rounded-xl object-contain shadow-md"
              />

              {/* Buttons for User */}
              {isLoggedIn && role === "user" && (
                <div className="flex mt-6 gap-6">
                  <button
                    onClick={handleFavourite}
                    className="flex items-center justify-center p-4 rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 shadow transition"
                  >
                    <FaHeart className="text-2xl" />
                    <span className="ml-2 hidden md:block font-medium">
                      Favourite
                    </span>
                  </button>
                  <button
                    onClick={handleCart}
                    className="flex items-center justify-center p-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow transition"
                  >
                    <FaShoppingCart className="text-2xl" />
                    <span className="ml-2 hidden md:block font-medium">
                      Add to Cart
                    </span>
                  </button>
                </div>
              )}

              {/* Buttons for Admin */}
              {isLoggedIn && role === "admin" && (
                <div className="flex mt-6 gap-6">
                  <Link
                    to={`/updateBook/${id}`}
                    className="flex items-center justify-center p-4 rounded-lg bg-yellow-200 hover:bg-yellow-400 shadow transition"
                  >
                    <FiEdit className="text-2xl" />
                    <span className="ml-2 hidden md:block font-medium">
                      Edit
                    </span>
                  </Link>
                  <button
                    onClick={deleteBook}
                    className="flex items-center justify-center p-4 rounded-lg bg-pink-400 text-white hover:bg-red-600 shadow transition"
                  >
                    <MdDelete className="text-2xl" />
                    <span className="ml-2 hidden md:block font-medium">
                      Delete
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Box: Book Info */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 lg:p-10 transition hover:shadow-2xl w-full">
              <h1 className="text-4xl font-bold text-gray-800">{Data.title}</h1>
              <p className="text-gray-600 mt-2 text-lg">by {Data.author}</p>
              <p className="text-gray-700 mt-6 text-lg leading-relaxed">
                {Data.desc}
              </p>
              <p className="flex items-center mt-6 text-gray-600 text-lg">
                <GrLanguage className="me-3 text-2xl" /> {Data.language}
              </p>
              <p className="mt-6 text-3xl font-semibold text-gray-900">
                Price: <span className="text-green-600">Rs {Data.price}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-gray-100 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
