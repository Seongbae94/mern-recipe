import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  const saveRecipe = async (recipeID) => {
    try {
      await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });

      alert("The recipe is saved!");
      fetchRecipe();
      fetchSavedRecipe();
    } catch (error) {
      alert("Please login to save the recipe!");
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  const fetchRecipe = async () => {
    try {
      const result = await axios.get("http://localhost:3001/recipes");
      setRecipes(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSavedRecipe = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
      );
      console.log(result);
      setSavedRecipes(result.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
    fetchSavedRecipe();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => {
          return (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
                {userID && (
                  <button
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </button>
                )}
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

export default Home;
