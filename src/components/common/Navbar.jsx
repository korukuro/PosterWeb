import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import logo from "../../additionalFile/logo.png";
import loupe from "../../additionalFile/loupe.png";
import bag from "../../additionalFile/shopping-bag.png";
import userIcon from "../../additionalFile/user.png";
import { getAllPoster } from "../../services/operations/posterDetailsAPI";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.profile?.user);
  const cart = useSelector((state) => state.cart || []);
  const [isFocused, setIsFocused] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProductData() {
    setLoading(true);
    try {
      const data = await getAllPoster();
      setPosts(data);
    } catch (error) {
      console.log("Data nhi aaya");
      setPosts([]);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down and passed threshold
      } else {
        setIsVisible(true); // Scrolling up
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
      setSearchInput(""); // Clear input value
      setIsClearing(false); // Reset animation
    }, 300); // Match the duration of the rotation animation
  };
  const [bgColor, setBgColor] = useState("rgba(229, 57, 53,0.9)");

  const generateRandomColor = () => {
    const colors = [
      "rgba(66, 165, 245, 0.9)",
      "rgba(255, 238, 88, 0.9)",
      "rgba(229, 57, 53,0.9)",
    ]; // Red, Yellow, Blue
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  const filterProducts = posts.filter((post) => {
    return post.posterName.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between pt-0 text-black items-center h-[5rem] border-2 border-black">
        {/* Logo */}
        <NavLink to="/">
          <img
            src={logo}
            className="h-14 lg:h-20 mr-2 mix-blend-darken"
            alt="shopping app"
          />
        </NavLink>

        <div className="flex flex-wrap items-center font-medium gap-1 lg:gap-4">
          {/* Categories */}
          <div className="transition-all duration-300 transform lg:hover:scale-105">
            <Link
              to="/categories"
              className="relative inline-block px-6 lg:py-1 sm:px-8 text-sm sm:text-base text-black transition-all duration-300"
              style={{
                clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
                backgroundColor: bgColor,
              }}
              onMouseEnter={generateRandomColor}
            >
              Categories
            </Link>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              id="search"
              autoComplete="off"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={`border border-black rounded-xl lg:p-1 pl-1 focus:outline-none lg:pl-2 pr-6 lg:pr-8 transition-all duration-300 h-7 lg:h-8 ${
                isFocused || searchInput ? "w-[5.3rem] lg:w-44 sm:w-60" : "w-20 lg:w-36 sm:w-44"
              } font-normal`}
              placeholder="Search"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {!isFocused && !searchInput && (
              <img
                src={loupe}
                alt="Search Icon"
                className="h-6 absolute top-[0.3rem] right-3 opacity-100 transition-opacity duration-300 hidden lg:block"
              />
            )}
            {searchInput && (
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClearInput}
                className={`absolute right-2 text-base top-1/2 lg:transform -translate-y-1/2 text-gray-500 hover:text-black lg:hover:scale-110 transition-transform duration-200 ease-in-out ${
                  isClearing ? "rotate-180" : "rotate-0"
                }`}
              >
                ✕
              </button>
            )}

            {searchInput && filterProducts.length > 0 && (
              <div className="absolute left-0 mt-1 w-full max-w-xs sm:max-w-md bg-white shadow-lg border rounded-lg z-10">
                {filterProducts.map((product) => (
                  <Link
                    to={`/poster/${product._id}`}
                    key={product._id}
                    className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors gap-4"
                  >
                    {/* Poster Image */}
                    <img
                      src={product.image || "default-placeholder-image.png"}
                      alt={product.posterName}
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-md object-cover"
                    />
                    {/* Poster Name */}
                    <span className="text-sm sm:text-base truncate">
                      {product.posterName}
                    </span>
                  </Link>
                ))}
              </div>
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
              className="h-8 sm:h-10 rounded-full aspect-square object-cover hover:scale-[1.1] active:scale-90 transition-all duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
