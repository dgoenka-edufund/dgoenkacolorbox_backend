const { listGetRecipes } = require("../../../service/recipes");
const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  try {
    console.log(mongoose.connection.readyState);
    const { from, size } = req.query;
    console.log("recipeList query started");
    const recipeList = await listGetRecipes({ from, size });
    console.log(recipeList);
    return res.status(200).json(recipeList);
  } catch (err) {
    err.status = 500;
    err.message = "Failed to list recipes";
    return next(err);
  }
};
