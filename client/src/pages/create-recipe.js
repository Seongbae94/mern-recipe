import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import Container from "../components/container";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [recipeInputs, setRecipeInputs] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = recipeInputs.ingredients;
    ingredients[index] = value;
    setRecipeInputs((prev) => ({ ...prev, ingredients }));
  };

  const addIngredient = () => {
    setRecipeInputs((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (e, index) => {
    const filteredIngredients = recipeInputs.ingredients.filter(
      (ingredient, i) => i !== index
    );

    setRecipeInputs((prev) => ({ ...prev, ingredients: filteredIngredients }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/recipes", recipeInputs);
      alert("Recipe Created!");
      navigate("/");
    } catch (error) {
      alert("Every field must be filled!");
    }
  };

  return (
    <Container>
      <h1>Create Recipe</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients</label>
        <button onClick={addIngredient} type="button">
          Add Ingredient
        </button>
        {recipeInputs.ingredients?.map((ingredient, index) => {
          return (
            <div className="input--ingredient" key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
              />
              <button onClick={(e) => removeIngredient(e, index)} type="button">
                <Close />
              </button>
            </div>
          );
        })}
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
          rows={5}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit" className="button--end">
          Create Recipe
        </button>
      </form>
    </Container>
  );
};

export default CreateRecipe;
