const { getUsersCollection } = require("../util/db");
const usersCollection = getUsersCollection();

const getUser = async (filter) => {
  console.log(filter);
  return await usersCollection.findOne(filter);
};

module.exports = {
  getUser,
  getUsersCollection,
};
