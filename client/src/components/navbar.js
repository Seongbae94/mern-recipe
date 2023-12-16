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
    { name: "LogIn", path: "/auth" },
  ]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <div className="navbar__items">
        <div className="navbar--logo">logo</div>
        <div className="navbar--hamburger">
          <MenuIcon />
        </div>

        {navlist.map((item, index) => {
          const path = window.location.pathname;
          const isSamePath = path === item.path;

          if (item.path === "/auth") {
            return cookies.access_token ? (
              <button key={index} className="navbar--logout" onClick={logout}>
                Logout
              </button>
            ) : (
              <Link key={index} className={`navbar--login`} to={item.path}>
                {item.name}
              </Link>
            );
          }
          return (
            <Link
              key={index}
              to={item.path}
              className={`${isSamePath ? "navbar--secondary" : ""}`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
