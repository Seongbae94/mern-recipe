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
import { useCookies } from "react-cookie";

const RecipeDetail = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const recipeID = window.location.pathname.split("/")[1];
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    const pathname = window.location.pathname;

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}/recipes${pathname}`,
        { headers: { authorization: cookies.access_token } }
      );

      setRecipe(result.data.recipe);
    } catch (error) {
      //no authorization
      if (error.response.status === 401) {
        alert(error.response.data.message);
        navigate("/auth");
      }

      //invalid request
      if (error.response.status === 400) {
        alert(error.response.data.message);
        navigate(-1);
      }
    }
  };

  const fetchSavedRecipe = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}/recipes/savedRecipes/ids/${userID}`,
        { headers: { authorization: cookies.access_token } }
      );

      setSavedRecipes(result.data.savedRecipes);
    } catch (error) {
      if (error.response.status === 401) {
        alert(error.response.data.message);
        navigate("/auth");
      }

      if (error.response.status === 400) {
        alert(error.response.data.message);
        navigate(-1);
      }
    }
  };

  const recipeAction = async (action) => {
    if (action === "save" || action === "remove") {
      try {
        await axios.put(
          `${process.env.REACT_APP_SERVER}/recipes`,
          {
            userID,
            recipeID,
            action,
          },
          { headers: { authorization: cookies.access_token } }
        );

        if (action === "save") {
          alert("This recipe is saved!");
        }

        if (action === "remove") {
          alert("This recipe is unsaved!");
        }
        fetchSavedRecipe();
        fetchRecipe();
      } catch (error) {
        if (error.response.status === 401) {
          alert(error.response.data.message);
          navigate("/auth");
        }

        if (error.response.status === 400) {
          alert(error.response.data.message);
          navigate(-1);
        }
      }
    }

    if (action === "delete") {
      try {
        if (!window.confirm("Are you sure to delete this recipe?")) return null;

        await axios.delete(`${process.env.REACT_APP_SERVER}/recipes`, {
          data: {
            recipeID,
            userID,
          },
          headers: { authorization: cookies.access_token },
        });

        alert("The recipe is deleted!");
        fetchRecipe();
        fetchSavedRecipe();
        navigate("/");
      } catch (error) {
        if (error.response.status === 401) {
          alert(error.response.data.message);
          navigate("/auth");
        }

        if (error.response.status === 400) {
          alert(error.response.data.message);
          navigate(-1);
        }
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
