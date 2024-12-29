import './App.css';
import { Routes, Route } from "react-router-dom"

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
  return (
    <div className='flex flex-col'>

      <div className=''>
        <Navbar />
      </div>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          
        

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
          {/* Route for all users */}
          {/* <Route path="dashboard/my-profile" element={<MyProfile />} /> */}
          {/* <Route path="dashboard/Settings" element={<Settings />} /> */}
          <Route path='/dashboard/cart' element={<Cart />}></Route>
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Error />} />

      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
