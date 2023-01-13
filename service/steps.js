const { getStepsCollection } = require("../util/db");
const stepsCollection = getStepsCollection();

const listGetRecipeSteps = async ({ match, from, size }) => {
  const paginationAndSort = [];

  if (size) {
    paginationAndSort.push(
      { $skip: Number(from) || 0 },
      { $limit: Number(size) }
    );
  }

  const data = (
    await stepsCollection.aggregate([
      ...(match ? [{ $match: match }] : []),
      {
        $facet: {
          steps: paginationAndSort,
          count: [{ $count: "totalRecords" }],
        },
      },
    ])
  )[0];

  return {
    ...data,
    count: data.count[0].totalRecords,
  };
};

module.exports = { listGetRecipeSteps };
