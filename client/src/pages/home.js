import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/recipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipe = async () => {
    try {
      const result = await axios.get("http://localhost:3001/recipes");
      setRecipes(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <RecipeCard recipes={recipes} />
    </div>
  );
};

export default Home;
