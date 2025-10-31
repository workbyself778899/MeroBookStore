import { Link, useNavigate } from "react-router-dom"
import { IoReorderThreeOutline } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";
const Navbar = () => {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  const links = [
    {
      title: "Home",
      links: "/",
    },

    {
      title: "All Books",
      links: "/all-books",
    },
    {
      title: "Cart",
      links: "/cart",
    },
    {
      title: "Profile",
      links: "/profile",
    },
    {
      title: "Admin Profile",
      links: "/profile",
    }
  ]

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn == false) {
    links.splice(2, 3);
  }
  if (isLoggedIn == true && role == "user") {
    links.splice(4, 1);
  }
  if (isLoggedIn == true && role == "admin") {
    links.splice(2, 2);
  }
  const [MobileNav, setMobileNav] = useState("hidden")

  return (
    <>
      <nav className="z-50 fixed w-full  bg-[#F85606] text-white flex items-center justify-between px-8 py-2">
        <div className="flex gap-1 hover:cursor-pointer items-center">
          <img src="https://cdn-icons-png.flaticon.com/128/17174/17174470.png" className="h-10 bg-amber-50 p-1 rounded-2xl " alt="" />
          <h1 className="font-bold text-2xl">Mero BookStore</h1>
        </div>

        {/* --- Add Search Bar Here --- */}
        <form onSubmit={handleSearch} className="hidden bg-white rounded-2xl md:block mx-4">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1 rounded text-black"
          />
          <button type="submit" className="ml-2 px-3 py-1 bg-blue-600 rounded-2xl text-white">Search</button>
        </form>
        {/* --- End Search Bar --- */}


        <div className="nav-links-bookheaven block md:flex gap-4 items-center">
          <div className=" hidden md:flex  gap-4">
            {
              links.map((items, i) =>
              (
                <div className="flex items-center " key={i}>
                  {items.title == "Profile" || items.title == "Admin Profile" ? (<Link to={items.links} className="px-3 py-1 border-2 border-white rounded hover:bg-white hover:text-black" key={i}>
                    {items.title}
                  </Link>) :
                    (<Link to={items.links}
                      className="hover:text-blue-300 transition-all duration-300">
                      {items.title}
                    </Link>)}
                </div >
              )
              )
            }
          </div>
          {/*Add Button  */}

          {
            isLoggedIn == false && (
              <div className=" hidden md:flex gap-4">
                <Link to="/LogIn" className="px-3 py-1 border-2 border-white rounded hover:bg-white hover:text-black">LogIn</Link>
                <Link to="/SignUp" className="px-3 py-1 bg-blue-600  rounded hover:bg-green-600">SignUp</Link>
              </div>
            )
          }

          {/* icon for mobile  */}
          <button onClick={() =>
            MobileNav == "hidden" ? setMobileNav("block") : setMobileNav("hidden")
          }
            className="block md:hidden text-2xl  hover:text-orange-900" >
            <IoReorderThreeOutline />
          </button>
        </div>

      </nav>
      <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center text-white`}>
        {
          links.map((items, i) => {
            return (
              <Link onClick={() =>
                MobileNav == "hidden" ? setMobileNav("block") : setMobileNav("hidden")
              } to={items.links} className="text-3xl mb-8 hover:text-blue-200 font-semibold transition-all duration-300" key={i}>{items.title}</Link>
            )
          })
        }

        {
          isLoggedIn == false && (
            <>
              <Link to="/LogIn" className={`${MobileNav} text-3xl mb-8 font-semibold px-3 py-1  border-2 border-white rounded hover:bg-white hover:text-black`}>LogIn</Link>
              <Link to="/SignUp" className={`${MobileNav} text-3xl mb-8 font-semibold px-3 py-1 bg-blue-600  rounded hover:bg-green-600`}>SignUp</Link>
            </>
          )
        }

      </div>
    </>
  )
}
export default Navbar