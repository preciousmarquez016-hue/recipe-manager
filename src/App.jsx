import { useEffect, useState } from "react";
// TODO: import your components once you build them
import RecipeForm from "./components/RecipeForm";
import CategoryFilter from "./components/CategoryFilter";
import RecipeList from "./components/RecipeList";
import SummaryBar from "./components/SummaryBar";

const STARTER_RECIPES = [
  { id: 1, title: "Chicken Adobo", category: "Dinner", time: 45, favorite: false },
  { id: 2, title: "Beef Tapa", category: "Breakfast", time: 20, favorite: false },
  { id: 3, title: "Pancit Canton", category: "Lunch", time: 25, favorite: false },
  { id: 4, title: "Leche Flan", category: "Dessert", time: 60, favorite: false },
  { id: 5, title: "Tocino Silog", category: "Breakfast", time: 15, favorite: false },
  { id: 6, title: "Kare-Kare", category: "Dinner", time: 90, favorite: false },
];

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : STARTER_RECIPES;
  });

  const [filter, setFilter] = useState(() => {
    const storedFilter = localStorage.getItem("filter");
    return storedFilter || "All";
  });

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  useEffect(() => {
    const favoriteCount = recipes.filter((recipe) => recipe.favorite).length;
    document.title = `Recipes · ${favoriteCount} ★`;
  }, [recipes]);

  const handleAdd = (recipe) => {
    setRecipes((currentRecipes) => [
      ...currentRecipes,
      { ...recipe, id: Date.now() },
    ]);
  };

  const handleToggleFavorite = (id) => {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe,
      ),
    );
  };

  const handleDelete = (id) => {
    setRecipes((currentRecipes) =>
      currentRecipes.filter((recipe) => recipe.id !== id),
    );
  };

  const visibleRecipes =
    filter === "All"
      ? recipes
      : recipes.filter((recipe) => recipe.category === filter);
  const favoriteCount = recipes.filter((recipe) => recipe.favorite).length;

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Recipe Manager</h1>
          <p className="text-base-content/70 mt-2">
            Your personal collection of favorite dishes
          </p>
        </header>

        <RecipeForm onAdd={handleAdd} />

        <SummaryBar total={recipes.length} favorites={favoriteCount} />

        <CategoryFilter activeFilter={filter} onFilterChange={setFilter} />

        <RecipeList
          recipes={visibleRecipes}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
