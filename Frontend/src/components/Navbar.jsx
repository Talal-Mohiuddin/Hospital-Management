import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../URL";

const Navbar = () => {
  const [show, setShow] = React.useState(false);
  const { isAuthenticated, setisAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios
        .get(`${URL}/user/patient/logout`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setisAuthenticated(false);
          navigate("/");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about-us"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button
              style={{ cursor: "pointer" }}
              className="logoutBtn btn"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          ) : (
            <button
              style={{ cursor: "pointer" }}
              className="loginBtn btn"
              onClick={goToLogin}
            >
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
