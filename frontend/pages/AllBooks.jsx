import { useEffect, useState } from "react";
import BookCard from "../src/components/BookCard/BookCard";
import Loader from "../src/components/Loader/Loader";
import axios from "axios";

const AllBooks = () => {
  const [Data, setData] = useState();
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      let url = "https://shop-1-3t0g.onrender.com/api/v1/get-all-books";
      if (sort) url += `?sort=${sort}`;
      const response = await axios.get(url);
      setData(response.data.data);
    };
    fetchBooks();
  }, [sort]);

  return (
    <div className="px-4 sm:px-8 py-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h4 className="text-2xl sm:text-3xl font-bold text-gray-800">
          📚 All Books
        </h4>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label
            className="text-sm sm:text-base font-medium text-gray-700"
            htmlFor="sort-select"
          >
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm bg-white 
                       focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          >
            <option value="">Default (Latest)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Loader */}
      {!Data && (
        <div className="flex items-center justify-center my-12">
          <Loader />
        </div>
      )}

      {/* Book Grid */}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Data &&
          Data.map((items, i) => (
            <BookCard key={i} data={items} />
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
