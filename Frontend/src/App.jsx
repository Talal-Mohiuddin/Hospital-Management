import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Appointment, AboutUs, Register, Login } from "./Pages/index.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/index.js";
import { useAuth } from "./context/userContext.jsx";
import axios from "axios";
import Footer from "./components/Footer.jsx";
import { URL } from "./URL.jsx";
const App = () => {
  const { isAuthenticated, setisAuthenticated, setuser } = useAuth();
  useEffect(() => {
    async function fetchUser() {
      try {
        await axios
          .get(`${URL}/user/patient/me`, {
            withCredentials: true,
          })
          .then((res) => {
            setisAuthenticated(true);
            setuser(res.data.user);
          });
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    fetchUser();
  }, [setisAuthenticated, setuser, isAuthenticated]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer/>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
