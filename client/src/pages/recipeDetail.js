import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ThumbUpAlt,
  Delete,
  ThumbUpOffAltOutlined,
  Undo,
} from "@mui/icons-material";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import Container from "../components/container";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const recipeID = window.location.pathname.split("/")[1];
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    const pathname = window.location.pathname;

    try {
      const result = await axios.get(
        `http://localhost:3001/recipes${pathname}`
      );
      setRecipe(result.data);
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

  const recipeAction = async (action) => {
    if (action === "save" || action === "remove") {
      try {
        await axios.put(`http://localhost:3001/recipes`, {
          userID,
          recipeID,
          action,
        });

        alert("This recipe is saved!");
        fetchSavedRecipe();
        fetchRecipe();
      } catch (error) {
        console.log(error);
      }
    }

    if (action === "delete") {
      try {
        if (!window.confirm("Are you sure to delete this recipe?")) return null;

        await axios.delete("http://localhost:3001/recipes", {
          data: {
            recipeID,
            userID,
          },
        });

        alert("The recipe is deleted!");
        fetchRecipe();
        fetchSavedRecipe();
        navigate("/");
      } catch (error) {
        alert("An error occurred. Please try again!");
      }
    }

    if (action === "return") {
      navigate(-1);
    }
  };

  const isRecipeSaved = () => savedRecipes.includes(recipeID);

  useEffect(() => {
    fetchRecipe();
    fetchSavedRecipe();
  }, []);

  console.log(recipe);
  return (
    <Container>
      <div className="recipe--detail">
        <div className="button--group">
          {isRecipeSaved() ? (
            <button onClick={() => recipeAction("remove")}>
              <ThumbUpAlt />
            </button>
          ) : (
            <button onClick={() => recipeAction("save")}>
              <ThumbUpOffAltOutlined />
            </button>
          )}

          {recipe.userOwner === userID && (
            <button
              className="button--bin"
              onClick={() => recipeAction("delete")}
            >
              <Delete />
            </button>
          )}

          <button
            className="button-undo"
            onClick={() => recipeAction("return")}
          >
            <Undo />
          </button>
        </div>
        <h1>{recipe.name}</h1>
        <img src={recipe.imageUrl} alt={recipe.name} />
        <div className="ingredients">
          <h2>Ingredients</h2>
          {recipe.ingredients?.map((ingredient, index) => {
            return <p key={index}>{ingredient}</p>;
          })}
        </div>
        <div className="instructions">
          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
        </div>
        <div>
          <h2>Cooking Time:</h2>
          <p>{recipe.cookingTime}</p>
        </div>
      </div>
    </Container>
  );
};

export default RecipeDetail;
