const mongoose = require("mongoose");

const getUsersCollection = () =>
  mongoose.model(
    "members",
    {
      id: { type: String },
      name: { type: String },
      user_id: { type: String },
      password: { type: String },
    },
    "members"
  );
const getRecipesCollection = () =>
  mongoose.model(
    "recipes",
    {
      id: { type: String },
      name: { type: String },
      desc: { type: String },
      image_url: { type: String },
      creator_id: { type: String },
    },
    "recipes"
  );
const getIngredientsCollection = () =>
  mongoose.model(
    "indegredients",
    {
      id: { type: String },
      items: { type: String },
      amount: { type: String },
      unit: { type: String },
      recipe_id: { type: String },
    },
    "indegredients"
  );
const getStepsCollection = () =>
  mongoose.model(
    "recipesteps",
    {
      id: { type: String },
      step: { type: String },
      recipe_id: { type: String },
    },
    "recipesteps"
  );

module.exports = {
  getUsersCollection,
  getRecipesCollection,
  getIngredientsCollection,
  getStepsCollection,
};
