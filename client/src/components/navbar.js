import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [navlist, setNavList] = useState([
    { name: "Home", path: "/" },
    { name: "Create Recipe", path: "/create-recipe" },
    { name: "Saved Recipes", path: "/saved-recipes" },
    { name: "My Recipes", path: "/my-recipes" },
    { name: "LogIn", path: "/auth" },
  ]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  const validateCheck = (path) => {
    if (!cookies.access_token) {
      if (path === "/create-recipe") {
        return alert("Please login to create a recipe");
      }

      if (path === "/saved-recipes") {
        return alert("Please login to see saved recipes");
      }

      if (path === "/my-recipes") {
        return alert("Please login to see my recipes");
      }
    }
  };

  return (
    <div className="navbar">
      <div className="navbar--items">
        <div className="navbar--logo">logo</div>
        <div className="navbar--hamburger">
          <MenuIcon />
        </div>

        <div className="navbar--items--list">
          {navlist.map((item, index) => {
            const path = window.location.pathname;
            const isSamePath = path === item.path;

            if (item.path === "/") {
              return (
                <div
                  className={`nav--item ${
                    isSamePath ? "navbar--secondary navbar--marker" : ""
                  }`}
                >
                  <Link key={index} to={item.path}>
                    {item.name}
                  </Link>
                </div>
              );
            }

            if (item.path !== "/auth" && item.path !== "/") {
              return (
                <div
                  className={`nav--item ${
                    isSamePath ? "navbar--secondary navbar--marker" : ""
                  }`}
                >
                  <Link
                    key={index}
                    to={cookies.access_token ? item.path : "/auth"}
                    className={`${isSamePath ? "navbar--secondary" : ""}`}
                    onClick={() => validateCheck(item.path)}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            }

            if (item.path === "/auth") {
              return cookies.access_token ? (
                <button key={index} className="navbar--logout" onClick={logout}>
                  Logout
                </button>
              ) : (
                <div className="nav--item">
                  <Link key={index} className={`navbar--login`} to={item.path}>
                    {item.name}
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
