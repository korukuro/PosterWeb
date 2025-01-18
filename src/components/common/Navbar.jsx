import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import logo from "../../additionalFile/logo.png";
import loupe from "../../additionalFile/loupe.png";
import bag from "../../additionalFile/shopping-bag.png";
import userIcon from "../../additionalFile/user.png";

const Navbar = () => {
  // Select only the necessary state slices
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.profile?.user);
  const cart = useSelector((state) => state.cart || []);

  return (
    <div className="flex justify-between text-black p-3 items-center h-[4rem]">
      {/* Logo */}
      <NavLink to="/">
        <img
          src={logo}
          className="h-20 mr-2 mix-blend-darken"
          alt="shopping app"
        />
      </NavLink>

      {/* Search Bar and Icons */}
      <div className="flex items-center font-medium gap-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="search"
            className="border border-black rounded-xl p-1 margin-left:4px"
            placeholder="Search"
          />
          <img src={loupe} alt="Search Icon" className="h-7 absolute top-1 right-3" />
        </div>

        {/* Cart Icon */}
        <Link to="/cart">
          <div className="relative">
            <img src={bag} alt="Shopping Bag" className="h-7" />
            {/* Show cart item count */}
            {cart.length > 0 && (
              <span
                className="absolute -top-1 -right-2 bg-black text-xs w-5 h-5 flex 
                justify-center items-center animate-bounce rounded-full text-white"
              >
                {cart.length}
              </span>
            )}
          </div>
        </Link>

        {/* User Profile Icon */}
        <Link to={token ? "/dashboard/order-history" : "/login"}>
          <img
            src={user?.image || userIcon}
            alt="User Icon"
            className="h-10 rounded-full aspect-square object-cover"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
