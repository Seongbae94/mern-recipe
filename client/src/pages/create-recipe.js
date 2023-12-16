import React, { useState } from "react";

const CreateRecipe = () => {
  const [recipeInputs, setRecipeInputs] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: "",
  });

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

  const onSubmit = (e) => {
    e.preventDefault();

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients</label>
        <button onClick={addIngredient} type="button">
          Add Ingredient
        </button>
        {recipeInputs.ingredients.map((ingredient, index) => {
          return (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
            />
          );
        })}
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
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
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
