import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/card.css";
import { CardButton } from "../components/cardButton";
import BACKEND_URL from "../config";

export const Home = () => {
  const [recipes, setRecipes] = useState([
    {
      // Add recipe details - dummy data
      imageUrl:
        "https://www.cookwithmanali.com/wp-content/uploads/2014/04/Paneer-Tikka-Masala.jpg",
      name: "Paneer Tikka Masala",
      description:
        "Paneer Tikka Masala is a popular Indian dish made with marinated and grilled paneer cubes simmered in a rich onion tomato gravy.",
      cookingTime: 30,
      instructions: `
    1- We will start by making the paneer tikka. To a large bowl, add yogurt (1/3 cup + 1 tablespoon), make sure the yogurt is thick (if using regular homemade yogurt, drain the yogurt for 3 to 4 hours before using in the recipe). To that add the following:
    2- Using a spatula or whisk, mix until all the ingredients are well combined.
    3- Now add 225 grams paneer (cubed into big cubes), 1 medium red onion (quartered and separated into petals) and 1 medium green pepper (cut into 1 inch cubes).
    4- Mix until the paneer, onion and peppers are well coated with the marinade. You can use your hands here. Cover the bowl and refrigerate for 30 minutes at the least.`,
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetches all the recipies
    const fetchReipes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/recipes/get_recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReipes();
  }, []);

  const viewRecipeButtonClick = (recipeID) => {
    navigate(`/viewRecipe/${recipeID}`);
  };

  return (
    <div className="container">
      {recipes?.length === 0 && (
        <h2 className="page-heading">No recipes found</h2>
      )}
      <div className="card-container">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  src={recipe.recipeImage}
                  alt={recipe.alt}
                />
                <h2 className="card-title">{recipe.title}</h2>

                <div className="card-description">{recipe.description}</div>
                <div className="cooking-time">
                  Cooking time : {recipe.cook_time} Minutes
                </div>
              </div>(
              <CardButton onClick={() => viewRecipeButtonClick(recipe.id)}>View Recipe</CardButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
