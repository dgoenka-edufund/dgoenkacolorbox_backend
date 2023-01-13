const express = require("express");
const router = express.Router();

const listRecipes = require("./listRecipes/api");
const getRecipe = require("./getRecipe/api");

router.get("/listRecipes", listRecipes);
router.get("/getRecipe/:recipe_id", getRecipe);

module.exports = router;
