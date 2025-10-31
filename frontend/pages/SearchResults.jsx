import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../src/components/BookCard/BookCard";
import Loader from "../src/components/Loader/Loader";
import axios from "axios";

const SearchResults = () => {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Get query from URL
  const params = new URLSearchParams(location.search);
  const query = params.get("q");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://shop-1-3t0g.onrender.com/api/v1/search-books?q=${encodeURIComponent(query)}`);
        setResults(response.data.data);
      } catch (error) {

        setResults([]);
      }
      setLoading(false);
    };
    if (query) fetch();
  }, [query]);

  return (
    <div className="px-4">
      <h4 className="text-3xl font-semibold pt-4">
        Search Results for "{query}"
      </h4>
      {loading && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      {!loading && results && results.length === 0 && (
        <div className="my-8 text-xl text-center text-zinc-400">No books found.</div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results && results.map((items, i) => (
          <div key={i}>
            <BookCard data={items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;