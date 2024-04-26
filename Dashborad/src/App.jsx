import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AddNerDoctor,
  Dashboard,
  AddNewAdmin,
  Doctors,
  Login,
  Messages,
  Sidebar,
} from "./components/index";
import { useAdmin } from "./context/adminContext";
import { useEffect } from "react";
import axios from "axios";
import { URL } from "./URL";

const App = () => {
  const { isAuthenticated, setisAuthenticated, setuser } = useAdmin();

  useEffect(() => {
    async function fetchUser() {
      try {
        await axios
          .get(`${URL}/user/admin/me`, {
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
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/doctor/addnew" element={<AddNerDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
