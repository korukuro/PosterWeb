import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import logo from "../../additionalFile/logo.png";
import loupe from "../../additionalFile/loupe.png";
import bag from "../../additionalFile/shopping-bag.png";
import userIcon from "../../additionalFile/user.png";

const Navbar = () => {
  // Add fallback to prevent errors if state.auth or state.profile is undefined
  const { token } = useSelector((state) => state.auth || {});
  const { user } = useSelector((state) => state.profile || {});
  const { cart } = useSelector((state) => state || { cart: [] });

  return (
    <div className="flex justify-between text-black p-3 items-center h-[4rem]">
      <NavLink to="/">
        <div>
          <img src={logo} className="h-20 mr-2 mix-blend-darken" alt="shopping app" />
        </div>
      </NavLink>

      <div className="flex items-center font-medium gap-4">
        <div className="relative">
          <input type="search" className="border-2 border-black rounded-xl p-1 margin-left:4px" />
          <img src={loupe} alt="" className="h-7 absolute top-1 right-3" />
        </div>

        {/* Login / Signup / Dashboard */}
        <div className="hidden md:flex items-center gap-4 border-2">
          {user && (

            // <Link to="/dashboard/cart">
            //   <img src={userIcon} alt="userIcon" className="h-7" />
            // </Link>

            <Link to="/dashboard/cart">
              <div className="relative">
                <img src={bag} alt="bag" className="h-7" />
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
          )}
          {console.log("token", token)}
          {!token && (

            <div>
              
              <Link to="/login">
                <button className="bg-[#000000] text-white px-7 py-2 rounded-lg text-md font-bold">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-[#000000] text-white px-7 py-2 rounded-lg text-md font-bold">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
