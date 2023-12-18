import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import RecipeCardList from "../components/recipeCardList";
import Container from "../components/container";

const MyRecipe = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const userID = useGetUserID();

  const fetchRecipe = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3001/recipes/myRecipes/${userID}`
      );
      setMyRecipes(result.data.myRecipes);
    } catch (error) {
      alert("failed to fetch my recipes");
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
