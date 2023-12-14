import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <div className="navbar__items">
        <div className="left">
          <div className="navbar--logo">logo</div>
          <Link className="navbar--item" to="/">
            Home
          </Link>
          <Link className="navbar--item" to="/create-recipe">
            Create Recipe
          </Link>
          <Link className="navbar--item" to="/saved-recipes">
            Save Recipe
          </Link>
        </div>
        <div className="right">
          <div className="navbar--hamburger">
            <MenuIcon />
          </div>
          {!cookies.access_token ? (
            <Link className="navbar--item" to="/auth">
              Login/Register
            </Link>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
