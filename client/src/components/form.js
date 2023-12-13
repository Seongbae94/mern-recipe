import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const FormComponent = ({ title }) => {
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
        alert(result.data.message);
      } catch (error) {
        console.log(error);
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
    <div>
      <form onSubmit={onSubmit}>
        <h2>{title}</h2>
        <div>
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
        <div>
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

        <button type="submit">{title}</button>
      </form>
    </div>
  );
};

export default FormComponent;
