import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import RecipeCardList from "../components/recipeCardList";
import Container from "../components/container";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const SavedRecipes = () => {
  const [recipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}/recipes/savedRecipes/${userID}`,
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(result.data.savedRecipes);
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
      <h1>Saved Recipes</h1>
      <RecipeCardList recipes={recipes} />
    </Container>
  );
};

export default SavedRecipes;
