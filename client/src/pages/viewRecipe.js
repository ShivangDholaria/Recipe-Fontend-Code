import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/viewRecipe.css";
import { CardButton } from "../components/cardButton";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../config";


export const ViewRecipe = () => {
  const { recipeID } = useParams();
  const [recipe, setRecipe] = useState({
    // Add recipe details
    // imageUrl:
    //   "https://www.cookwithmanali.com/wp-content/uploads/2014/04/Paneer-Tikka-Masala.jpg",
    // name: "Paneer Tikka Masala",
    // description:
    //   "Paneer Tikka Masala is a popular Indian dish made with marinated and grilled paneer cubes simmered in a rich onion tomato gravy.",
    // cookingTime: 30,
    // instructions: `We will start by making the paneer tikka. To a large bowl, add yogurt (1/3 cup + 1 tablespoon), make sure the yogurt is thick (if using regular homemade yogurt, drain the yogurt for 3 to 4 hours before using in the recipe).\nUsing a spatula or whisk, mix until all the ingredients are well combined.\nNow add 225 grams paneer (cubed into big cubes), 1 medium red onion (quartered and separated into petals) and 1 medium green pepper (cut into 1 inch cubes).\nMix until the paneer, onion and peppers are well coated with the marinade. You can use your hands here. Cover the bowl and refrigerate for 30 minutes at the least.`,
  });

  const navigate = useNavigate();

  const deleteRecipe = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/recipes/delete_recipe/${recipeID}`);
      alert("Recipe Deleted");
      navigate(`/`);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch recipe details
    const fetchData = async () => {
      try {
        const url = `${BACKEND_URL}/recipes/get_recipes_by_id/${recipeID}`
        console.log(url)
        const recipeResponse = await axios.get(url)
        const recipeData = recipeResponse.data;
        setRecipe(recipeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [recipeID]);

  return (
    <div className="container">
      <h2 className="page-heading">View Recipe</h2>
      <div className="viewRecipe-card">
        <div className="card">
          <div className="card-body">
            <img
              className="card-image"
              src={recipe.recipeImage}
              alt={recipe.title}
            />
            <h2 className="card-title">{recipe.name}</h2>

            <div className="card-description">{recipe.description}</div>
            <div className="cooking-time">
              Cooking time : {recipe.cook_time} Minutes
            </div>

            <div className="instructions">
              <div className="instructions-heading">Instructions</div>
              <div className="instructions-content">
                {recipe.procedure?.split("\n").map((line, index) => {
                  return (
                    <div className="line" key={index}>
                      <span className="line-number">{index + 1}. </span>
                      <span className="line-content">{line}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <CardButton onClick={deleteRecipe}>Delete Recipe</CardButton>
          </div>
        </div>
      </div>
    </div>
  );
};
