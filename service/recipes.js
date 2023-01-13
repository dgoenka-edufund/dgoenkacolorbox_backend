const { getRecipesCollection } = require("../util/db");
const recipesCollection = getRecipesCollection();

const commonRecipeItemPipeLine = [
  {
    $lookup: {
      from: "members",
      localField: "creator_id",
      foreignField: "id",
      as: "creator_info_arr",
    },
  },
  {
    $set: {
      creator_info: {
        $first: "$creator_info_arr",
      },
    },
  },
  {
    $unset: "creator_info_arr",
  },
  {
    $unset: "creator_id",
  },
];

const listGetRecipes = async ({ match, from, size }) => {
  const paginationAndSort = [];

  if (size) {
    paginationAndSort.push(
      { $skip: Number(from) || 0 },
      { $limit: Number(size) }
    );
  }

  const pipeLine = [
    ...(match ? [{ $match: match }] : []),
    ...commonRecipeItemPipeLine,
    {
      $facet: {
        recipes: paginationAndSort,
        count: [{ $count: "totalRecords" }],
      },
    },
  ];

  const data = (await recipesCollection.aggregate(pipeLine))[0];

  return {
    ...data,
    count: data.count[0].totalRecords,
  };
};

module.exports = { listGetRecipes };
