import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeCardList from "../components/recipeCardList";
import Container from "../components/container";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipe = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_SERVER}/recipes`);
      setRecipes(result.data);
    } catch (error) {
      alert("failed to fetch recipes data");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <Container>
      <h1>Recipes</h1>
      <RecipeCardList recipes={recipes} />
    </Container>
  );
};

export default Home;
