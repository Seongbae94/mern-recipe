import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Container from "../components/container";

const FormComponent = ({ title, isLogin, setIsLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  const [_, setCookies] = useCookies(["access_token"]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username: user.username,
      password: user.password,
    };

    const url = `http://localhost:3001/auth/${title}`;
    if (title === "register") {
      try {
        const result = await axios.post(url, body);
        console.log(result);
        setIsLogin(true);
        alert(result.data.message);
      } catch (error) {
        if (error.response.status === 409) {
          alert(error.response.data.message);
        }
      }
    }

    if (title === "login") {
      try {
        const result = await axios.post(url, body);

        if (result.data.token) {
          setCookies("access_token", result.data.token);
          window.localStorage.setItem("userID", result.data.userID);
          navigate("/");
        } else {
          alert(result.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <div className="auth">
        <form onSubmit={onSubmit}>
          <div className="img--container">
            <img
              src="https://media.istockphoto.com/id/1323727851/vector/cute-funny-mango-fruit-character-vector-hand-drawn-cartoon-kawaii-character-illustration.jpg?s=612x612&w=0&k=20&c=ama6pRaf2HXzRpJaTcTqSaAWwfohoESSQ9cFEhmOEAA="
              alt="auth--img"
            />
          </div>
          <h2>{title}</h2>
          <div className="input--auth">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>
          <div className="input--auth">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          {isLogin && (
            <div className="p--auth">
              <p>Don't have the account?</p>
              <p onClick={() => setIsLogin(!isLogin)}>Click to register</p>
            </div>
          )}

          {!isLogin && (
            <div className="p--auth">
              <p>Already registerd?</p>
              <p onClick={() => setIsLogin(!isLogin)}>Click to Login</p>
            </div>
          )}

          <button type="submit">{title}</button>
        </form>
      </div>
    </Container>
  );
};

export default FormComponent;
