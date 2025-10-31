import axios from "axios"
import { useEffect, useState } from "react"
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,

  };
  try {
    useEffect(() => {
      const fetch = async () => {
        const response = await axios.get(`https://shop-1-3t0g.onrender.com/api/v1/get-favourite-books`, { headers });
        setFavouriteBooks(response.data.data);
      };
      fetch();
    }, [FavouriteBooks])
  } catch (error) {
    console.log("In Favorite component", error)
  }
  return (
    <>
      <h2 className="text-2xl font-bold pb-3">Your Favourite Books</h2>
      {FavouriteBooks?.length == 0 && (
        <div className="text-xl font-semibold flex items-center justify-center text-black w-full bg-pink-100 p-3">No Favourite Books  </div>
      )}
      <div className="grid grid-cols-3 gap-5">

        {
          FavouriteBooks &&
          FavouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favourite={true} ></BookCard>
            </div>
          ))
        }
      </div>
    </>
  )
}
export default Favourites