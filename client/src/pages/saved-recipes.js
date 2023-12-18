import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import RecipeCard from "../components/recipeCard";

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
    <div>
      <h1>Saved Recipes</h1>
      <RecipeCard recipes={recipes} />
    </div>
  );
};

export default SavedRecipes;
