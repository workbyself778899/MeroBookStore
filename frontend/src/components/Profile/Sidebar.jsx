import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-between min-h-screen md:min-h-[85vh]">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center">
        <img
          src={data.avatar}
          className="h-20 w-20 rounded-full border-2 border-orange-400 object-cover"
          alt="Profile"
        />
        <p className="mt-3 text-lg font-semibold text-gray-800">
          {data.username}
        </p>
        <p className="mt-1 text-sm text-gray-500">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-gray-200 hidden lg:block"></div>
      </div>

      {/* Menu for User */}
      {role === "user" && (
        <div className="w-full flex-col mt-4 hidden lg:flex flex-grow">
          <Link
            className="text-gray-700 font-medium w-full py-2 text-center rounded hover:bg-orange-100 hover:text-orange-600 transition-all"
            to="/profile"
          >
            Favourites
          </Link>
          <Link
            className="text-gray-700 font-medium w-full py-2 text-center rounded hover:bg-orange-100 hover:text-orange-600 transition-all"
            to="/profile/orderHistory"
          >
            Order History
          </Link>
          <Link
            className="text-gray-700 font-medium w-full py-2 text-center rounded hover:bg-orange-100 hover:text-orange-600 transition-all"
            to="/profile/settings"
          >
            Settings
          </Link>
        </div>
      )}

      {/* Menu for Admin */}
      {role === "admin" && (
        <div className="w-full flex-col mt-4 hidden lg:flex flex-grow">
          <Link
            className="text-gray-700 font-medium w-full py-2 text-center rounded hover:bg-orange-100 hover:text-orange-600 transition-all"
            to="/profile"
          >
            All Orders
          </Link>
          <Link
            className="text-gray-700 font-medium w-full py-2 text-center rounded hover:bg-orange-100 hover:text-orange-600 transition-all"
            to="/profile/add-book"
          >
            Add Book
          </Link>
        </div>
      )}

      {/* Logout Button */}
      <div className="mt-6 w-full">
        <button
          className="bg-orange-500 hover:bg-orange-600 w-full text-white font-semibold flex items-center justify-center py-2 rounded transition-all duration-300"
          onClick={() => {
            dispatch(authActions.logout());
            dispatch(authActions.changeRole("user"));
            localStorage.clear("id");
            localStorage.clear("token");
            localStorage.clear("role");
            history("/");
          }}
        >
          Log Out <IoIosLogOut className="ml-2 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
