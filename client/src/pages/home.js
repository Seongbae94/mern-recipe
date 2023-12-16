import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();

  const saveRecipe = async (recipeID) => {
    try {
      await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });

      alert("The recipe is saved!");
    } catch (error) {
      alert("Please login to save the recipe!");
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const result = await axios.get("http://localhost:3001/recipes");
        setRecipes(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
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
                    disabled={recipe.userOwner === userID}
                  >
                    Save
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
