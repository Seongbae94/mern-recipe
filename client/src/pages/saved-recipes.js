import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import RecipeCardList from "../components/recipeCardList";
import Container from "../components/container";

const SavedRecipes = () => {
  const [recipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  const fetchRecipe = async () => {
    const result = await axios.get(
      `http://localhost:3001/recipes/savedRecipes/${userID}`
    );
    setSavedRecipes(result.data.savedRecipes);
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
