import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import CreateRecipe from "./pages/create-recipe";
import SavedRecipes from "./pages/saved-recipes";
import Navbar from "./components/navbar";
import RecipeDetail from "./pages/recipeDetail";
import MyRecipe from "./pages/myRecipe";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/my-recipes" element={<MyRecipe />} />
          <Route path="/:recipeID" element={<RecipeDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
