import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";

// common
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages 
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import VerifyEmail from './Pages/VerifyEmail';
import Dashboard from './Pages/Dashboard';
import Error from './Pages/Error';

// auth
import OpenRoute from './components/core/auth/OpenRoute';
import PrivateRoute from './components/core/auth/PrivateRoute';

function App() {
  const location = useLocation();

  // Specify the paths where the Navbar should be hidden
  const hideNavbarPaths = ["/login", "/signup", "/verify-email"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div className='flex flex-col'>
      {!shouldHideNavbar && (
        <div>
          <Navbar />
        </div>
      )}

      <Routes>
        <Route path='/' element={<Home />} />

        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path='/dashboard/cart' element={<Cart />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>
      
      {/* <Footer /> */}
    </div>
  );
}

export default App;
