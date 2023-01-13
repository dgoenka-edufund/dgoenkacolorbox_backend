const { listGetRecipes } = require("../../../service/recipes");
const { listGetRecipeSteps } = require("../../../service/steps");

module.exports = async (req, res, next) => {
  try {
    const { recipe_id } = req.params;
    const recipe = await listGetRecipes({
      match: { id: recipe_id },
    });
    const recipeSteps = await listGetRecipeSteps({
      match: { recipe_id },
    });
    return res
      .status(200)
      .json({ recipe: recipe.recipes[0], steps: recipeSteps.steps });
  } catch (err) {
    if (!err.status) err.status = 500;
    if (!err.message) err.message = "Failed to fetch details for recipe";
    return next(err);
  }
};
