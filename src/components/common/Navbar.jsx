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
  const [isClearing, setIsClearing] = useState(false); // State for rotation animation

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

  const handleClearInput = () => {
    setIsClearing(true); // Start rotation animation
    setTimeout(() => {
      setValue(""); // Clear input value
      setIsClearing(false); // Reset animation
    }, 300); // Match the duration of the rotation animation
  };

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
          <Link
            to="/categories"
            className="relative inline-block px-6 py-1 font-bold text-white bg-red-600 hover:bg-blue-700 transition-all duration-300"
            style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }}
          >
            Categories
          </Link>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={`border border-black rounded-xl p-1 focus:outline-none pl-2 pr-8 transition-all duration-300 ${
                isFocused || value ? "w-60" : "w-44"
              }`}
              placeholder="Search"
              onFocus={() => setIsFocused(true)} // Set focus state to true
              onBlur={() => setIsFocused(false)} // Set focus state to false
            />

            {!isFocused && !value && (
              <img
                src={loupe}
                alt="Search Icon"
                className="h-6 absolute top-[0.3rem] right-3 opacity-100 transition-opacity duration-300"
              />
            )}
            {value && (
              <button
                onMouseDown={(e) => e.preventDefault()} // Prevent losing focus
                onClick={handleClearInput} // Clear the input value
                className={`absolute right-2 text-base top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black hover:scale-110 transition-transform duration-200 ease-in-out ${
                  isClearing ? "rotate-180" : "rotate-0"
                }`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart">
            <div className="relative hover:scale-110 active:scale-90 transition-transform duration-300 transform">
              <img src={bag} alt="Shopping Bag" className="h-7" />
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
              className="h-10 rounded-full aspect-square object-cover hover:scale-[1.1] active:scale-90 transition-all duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
