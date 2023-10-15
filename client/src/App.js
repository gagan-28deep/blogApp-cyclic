import Header from "./components/header/Header";
import Topbar from "./components/topbar/Topbar";

import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/navbar/Navbar";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <ToastContainer/>
      <Topbar />
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
        />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Register />}
        />
        <Route path="/posts" element={<Home />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
