import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import RecipeCard from "../components/recipeCard";

const MyRecipe = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const userID = useGetUserID();

  const fetchRecipe = async () => {
    const result = await axios.get(
      `http://localhost:3001/recipes/myRecipes/${userID}`
    );
    setMyRecipes(result.data.myRecipes);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div>
      <h1>My Recipes</h1>
      <RecipeCard recipes={myRecipes} />
    </div>
  );
};

export default MyRecipe;
