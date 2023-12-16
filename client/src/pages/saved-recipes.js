import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipe] = useState([]);
  const userID = useGetUserID();

  const fetchRecipe = async () => {
    const result = await axios.get(
      `http://localhost:3001/recipes/savedRecipes/${userID}`
    );
    setSavedRecipe(result.data.savedRecipes);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => {
          return (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <div>
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SavedRecipes;
