import AllBooks from "../pages/AllBooks";
import Cart from "../pages/Cart";
import Home from "../pages/Home"
import LogIn from "../pages/LogIn";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";

import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import { Routes, Route } from "react-router-dom";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import Settings from "./components/Profile/Settings";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import AllOrder from "../pages/AllOrder";
import AddBook from "../pages/AddBook";
import UpdateBook from "../pages/UpdateBook";
import SearchResults from "../pages/SearchResults";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div>


      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/all-books" element={<AllBooks />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/LogIn" element={<LogIn />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile" element={<Profile />}>
          {role == "user" ? (<Route index element={<Favourites />}></Route>) : (<Route index element={<AllOrder />}></Route>)}

          {role == "admin" && (<Route path="/profile/add-book" element={<AddBook />}></Route>)

          }

          <Route path="/profile/orderHistory" element={<UserOrderHistory />}></Route>
          <Route path="/profile/settings" element={<Settings />}></Route>

        </Route>
        <Route path="UpdateBook/:id" element={<UpdateBook />}></Route>
        <Route path="/view-book-details/:id" element={<ViewBookDetails />}></Route>

      </Routes>


      <Footer></Footer>




    </div >
  )
}
export default App