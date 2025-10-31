import { useEffect, useState } from "react"
import Loader from "../src/components/Loader/Loader";
import { MdRemoveShoppingCart } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios"

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Cart = () => {
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("https://shop-1-3t0g.onrender.com/api/v1/get-user-cart", { headers })

      setCart(res.data.data)
    };
    fetch();
  }, [Cart]);

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart])

  const deleteItem = async (bookid) => {
    const response = await axios.put(`https://shop-1-3t0g.onrender.com/api/v1/remove-from-cart/${bookid}`, {}, { headers })
    toast.error(response.data.message);
  };
  const PlaceOrder = async () => {
    try {
      const response = await axios.post(`https://shop-1-3t0g.onrender.com/api/v1/place-order`, { order: Cart }, { headers });
      alert(response.data.message)
      toast.success(response.data.message);
      navigate("/profile/orderHistory")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="bg-zinc-900 px-12 h-[100%] py-8">

        {!Cart && <div className="w-full h-[100%] flex items-center justify-center">
          <Loader /></div>}
        {Cart && Cart.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <h1 className="text-5xl lg:text-6xl text-center  font-semibold text-zinc-400">
                Empty Cart <MdRemoveShoppingCart className="text-7xl mx-auto mt-3" />
              </h1>

            </div>
          </div>
        )}

        {Cart && Cart.length > 0 && (
          <div className="bg-zinc-900 px-12  py-8">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
            {Cart.map((items, i) => (
              <div className="w-ful my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center" key={i}>
                <img src={items.url} alt="/" className="h-[20vh] md:h-[10vh] object-cover" />
                <div className="w-full md:w-auto">
                  <h1 className="text-2xl text-zinc-300 mt-2 md:mt-0">
                    {items.title}
                  </h1>
                  <p className="hidden fw-normal text-zinc-300 mt-2 lg:block">
                    {items.desc.slice(0, 100)}...
                  </p>
                  <p className="fw-normal text-zinc-300 mt-2 block md:hidden lg:hidden">
                    {items.desc.slice(0, 65)}...
                  </p>
                  <p className="fw-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                    {items.desc.slice(0, 65)}...
                  </p>
                </div>
                <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                  <h2 className="text-zinc-100 text-3xl font-semibold flex ">
                    Rs {items.price}
                  </h2>
                  <button className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12 "
                    onClick={() => deleteItem(items._id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {Cart && Cart.length > 0 && (
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 font-semibold">
              <h1 className="text-3xl text-zinc-200 font-semibold">
                Total Amount
              </h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{Cart.length} Books</h2> <h2>Rs, {Total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
                  onClick={PlaceOrder}
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default Cart