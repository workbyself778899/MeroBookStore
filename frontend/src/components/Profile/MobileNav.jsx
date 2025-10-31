import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);

  const navItemStyle =
    "block w-full py-3 text-center font-medium rounded-lg transition-all duration-200";

  return (
    <div className="lg:hidden mt-4 space-y-2 px-3">
      {role === "user" && (
        <div className="flex flex-col gap-2">
          <Link
            className={`${navItemStyle} bg-orange-500 text-white hover:bg-orange-600`}
            to="/profile"
          >
            Favourites
          </Link>
          <Link
            className={`${navItemStyle} bg-orange-500 text-white hover:bg-orange-600`}
            to="/profile/orderHistory"
          >
            Order History
          </Link>
          <Link
            className={`${navItemStyle} bg-orange-500 text-white hover:bg-orange-600`}
            to="/profile/settings"
          >
            Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="flex flex-col gap-2">
          <Link
            className={`${navItemStyle} bg-orange-500 text-white hover:bg-orange-600`}
            to="/profile"
          >
            All Orders
          </Link>
          <Link
            className={`${navItemStyle} bg-orange-500 text-white hover:bg-orange-600`}
            to="/profile/add-Book"
          >
            Add Book
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
