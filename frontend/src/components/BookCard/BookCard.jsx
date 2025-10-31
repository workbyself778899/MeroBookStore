import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "https://shop-1-3t0g.onrender.com/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );
      toast.error(response.data.message);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-white border border-gray-200 hover:border-orange-500 rounded-xl p-4 flex flex-col shadow-sm hover:shadow-md transition duration-200 ease-in-out">
      <ToastContainer />

      {/* Book Image */}
      <Link to={`/view-book-details/${data._id}`}>
        <div className="flex items-center justify-center h-[230px] border border-gray-100 rounded-lg overflow-hidden bg-gray-50">
          <img
            src={data.url}
            className="h-full object-contain"
            alt="Book"
          />
        </div>

        {/* Book Info */}
        <h2 className="mt-3 text-lg font-semibold text-gray-800 line-clamp-1">
          {data.title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">By {data.author}</p>
        <p className="mt-2 text-xl font-bold text-orange-600">
          Rs. {data.price}
        </p>
      </Link>

      {/* Favourite Button */}
      {favourite && (
        <button
          onClick={handleRemoveBook}
          className="mt-4 w-full py-2 text-sm font-medium text-orange-600 border border-orange-500 rounded-lg hover:bg-orange-50 transition"
        >
          Remove from Favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
