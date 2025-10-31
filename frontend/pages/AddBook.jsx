import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        toast.info("All fields are required");
      } else {
        const response = await axios.post(
          "https://shop-1-3t0g.onrender.com/api/v1/add-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6">
        📚 Add New Book
      </h1>
      <ToastContainer />

      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-6">
        {/* Image */}
        <div className="mb-4">
          <label className="text-gray-600 font-medium">Image URL</label>
          <input
            type="text"
            className="w-full mt-2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter image URL"
            name="url"
            value={Data.url}
            onChange={change}
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="text-gray-600 font-medium">Title</label>
          <input
            type="text"
            className="w-full mt-2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter book title"
            name="title"
            value={Data.title}
            onChange={change}
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="text-gray-600 font-medium">Author</label>
          <input
            type="text"
            className="w-full mt-2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter author name"
            name="author"
            value={Data.author}
            onChange={change}
          />
        </div>

        {/* Language + Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-600 font-medium">Language</label>
            <input
              type="text"
              className="w-full mt-2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter language"
              name="language"
              value={Data.language}
              onChange={change}
            />
          </div>
          <div>
            <label className="text-gray-600 font-medium">Price</label>
            <input
              type="number"
              className="w-full mt-2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter price"
              name="price"
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-gray-600 font-medium">Description</label>
          <textarea
            className="w-full mt-2 border border-gray-300 rounded-lg p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter book description"
            name="desc"
            value={Data.desc}
            onChange={change}
          ></textarea>
        </div>

        {/* Button */}
        <button
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all duration-300"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};
export default AddBook;
