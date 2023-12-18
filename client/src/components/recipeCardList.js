import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCardList = ({ recipes }) => {
  const navigate = useNavigate();

  const showDetailPage = (recipeID) => {
    navigate(`/${recipeID}`);
  };

  return (
    <div className="recipe--card--list">
      {recipes.map((recipe, index) => {
        return (
          <div
            key={index}
            className="recipe--card"
            onClick={() => showDetailPage(recipe._id)}
          >
            <h2>{recipe.name}</h2>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeCardList;
