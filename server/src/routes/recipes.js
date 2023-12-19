import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

//get all recipes
router.get("/", async (req, res) => {
  try {
    const allRecipes = await RecipeModel.find({});
    res.json(allRecipes);
  } catch (error) {
    res.json(error);
  }
});

//create a recipe
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);

  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

//save or remove a recipe
router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);

    if (req.body.action === "save") {
      user.savedRecipes.push(recipe);
      await user.save();
    }

    if (req.body.action === "remove") {
      const filteredRecipes = user.savedRecipes.filter(
        (recipeID) => !recipeID.equals(recipe._id)
      );

      user.savedRecipes = filteredRecipes;
      await user.save();
    }

    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(400).json({ message: "Please try again" });
  }
});

//delete a recipe
router.delete("/", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);

    if (user.savedRecipes.length > 0) {
      const filteredRecipes = user.savedRecipes.filter(
        (recipeID) => !recipeID.equals(req.body.recipeID)
      );

      user.savedRecipes = filteredRecipes;
      await user.save();
    }
    await RecipeModel.deleteOne({ _id: req.body.recipeID });
    res.json({ deleteRecipeID: req.body.recipeID });
  } catch (error) {
    // res.status(400).json(error);
    res.status(400).json({ message: "Please try again" });
  }
});

//get a specific recipe info
router.get("/:recipeID", verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.recipeID);
    res.json({ recipe });
  } catch (error) {
    res.status(400).json({ message: "Please try again" });
  }
});

//get saved recipes Id
router.get("/savedRecipes/ids/:userID", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.status(400).json({ message: "Please try again" });
  }
});

//get whole saved recipes info
router.get("/savedRecipes/:userID", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.json({ savedRecipes });
  } catch (error) {
    res.status(400).json({ message: "Please try again" });
  }
});

//get my reipces
router.get("/myRecipes/:userID", verifyToken, async (req, res) => {
  try {
    const recipes = await RecipeModel.find({ userOwner: req.params.userID });
    res.json({ myRecipes: recipes });
  } catch (error) {
    res.json(error);
  }
});

export { router as recipesRouter };
