import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import RecipeCardList from "../components/recipeCardList";
import Container from "../components/container";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const MyRecipe = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [myRecipes, setMyRecipes] = useState([]);
  const userID = useGetUserID();
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}/recipes/myRecipes/${userID}`,
        { headers: { authorization: cookies.access_token } }
      );
      console.log("result", result);
      setMyRecipes(result.data.myRecipes);
    } catch (error) {
      //no authorization
      if (error.response.status === 401) {
        alert(error.response.data.message);
        navigate("/auth");
      }

      //invalid request
      if (error.response.status === 400) {
        alert(error.response.data.message);
        navigate(-1);
      }
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <Container>
      <h1>My Recipes</h1>
      <RecipeCardList recipes={myRecipes} />
    </Container>
  );
};

export default MyRecipe;
