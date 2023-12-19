import React, { useEffect, useState } from "react";
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
  const [navigationOpen, setNavigationeOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let thresholdWidth = 768;
    let previousWidth = window.innerWidth;
    window.onresize = function () {
      let movedUpThroughThreshold =
        previousWidth < thresholdWidth && window.innerWidth >= thresholdWidth;
      let movedDownThroughThreshold =
        previousWidth >= thresholdWidth && window.innerWidth <= thresholdWidth;

      if (movedUpThroughThreshold || movedDownThroughThreshold) {
        console.log("passed threshold", previousWidth, "->", window.innerWidth);
        setNavigationeOpen(false);
      }

      previousWidth = window.innerWidth;
    };
  }, []);

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
        <div className="navbar--logo" onClick={() => navigate("/")}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwh3uQo9eGIlqOWRi9HYuxk8klLiKYdrGvw&usqp=CAU"
            alt="logo-iamge"
          />
        </div>
        <div
          className="navbar--hamburger"
          onClick={() => setNavigationeOpen(!navigationOpen)}
        >
          <MenuIcon />
        </div>

        {/* navber on mobile */}
        {navigationOpen && (
          <div
            className="navbar--mobile--background"
            onClick={() => setNavigationeOpen(false)}
          >
            <div className="navbar--list--mobile">
              {navlist.map((item, index) => {
                if (cookies.access_token && item.path === "/auth") {
                  return (
                    <Link
                      to={item.path}
                      key={index}
                      onClick={() => setNavigationeOpen(false)}
                    >
                      Logout
                    </Link>
                  );
                }
                return (
                  <Link
                    to={item.path}
                    key={index}
                    onClick={() => setNavigationeOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* navber on desktop */}
        <div className="navbar--list--desktop">
          {navlist.map((item, index) => {
            const path = window.location.pathname;
            const isSamePath = path === item.path;

            if (item.path === "/") {
              return (
                <div
                  key={index}
                  className={`nav--item ${
                    isSamePath ? "navbar--secondary navbar--marker" : ""
                  }`}
                >
                  <Link to={item.path}>{item.name}</Link>
                </div>
              );
            }

            if (item.path !== "/auth" && item.path !== "/") {
              return (
                <div
                  key={index}
                  className={`nav--item ${
                    isSamePath ? "navbar--secondary navbar--marker" : ""
                  }`}
                >
                  <Link
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
                <div className="nav--item" key={index}>
                  <Link className={`navbar--login`} to={item.path}>
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
