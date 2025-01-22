import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import logo from "../../additionalFile/logo.png";
import loupe from "../../additionalFile/loupe.png";
import bag from "../../additionalFile/shopping-bag.png";
import userIcon from "../../additionalFile/user.png";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.profile?.user);
  const cart = useSelector((state) => state.cart || []);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and passed threshold
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between text-black p-3 items-center h-[5rem]">
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
          {/* Categories */}
          <Link to="/categories" className="hover:underline">
            Categories
          </Link>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border border-black rounded-xl p-1 focus:outline-none pl-2 pr-8 transition-all duration-300"
              placeholder="Search"
              onFocus={() => setIsFocused(true)} // Set focus state to true
              onBlur={() => setIsFocused(false)} // Set focus state to false
            />
            {!isFocused && (
              <img
                src={loupe}
                alt="Search Icon"
                className="h-7 absolute top-1 right-3 opacity-100 transition-opacity duration-300"
              />
            )}
            {isFocused && value && (
              <button
                onMouseDown={(e) => e.preventDefault()} // Prevent losing focus
                onClick={() => setValue("")} // Clear the input value
                className="absolute right-2 text-base top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-transform duration-300"
              >
                ✕
              </button>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart">
            <div className="relative">
              <img src={bag} alt="Shopping Bag" className="h-7" />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-2 bg-black text-xs w-5 h-5 flex 
                  justify-center items-center animate-bounce rounded-full text-white"
                >
                  {cart.length}
                  <Link to="/cart">
                    <div className="relative group border-2 border-black">
                      {/* Shopping Bag Icon */}
                      <img
                        src={bag}
                        alt="Shopping Bag"
                        className="h-7 transform transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Cart Badge */}
                      {cart.length > 0 && (
                        <span
                          className="absolute -top-1 -right-2 bg-black text-xs w-5 h-5 flex 
        justify-center items-center animate-bounce rounded-full text-white 
        transform transition-transform duration-300 group-hover:scale-125"
                        >
                          {cart.length}
                        </span>
                      )}
                    </div>
                  </Link>
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
    </div>
  );
};

export default Navbar;
