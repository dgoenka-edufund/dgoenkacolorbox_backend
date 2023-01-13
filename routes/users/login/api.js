const userService = require("../../../service/users");
const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  try {
    console.log(mongoose.connection.readyState);
    const { user_id, password } = req.body;
    console.log(user_id, password);
    //TODO: This is not actually the way to authenticate. There should be use of JWT.
    const user = await userService.getUser({ user_id, password });
    console.log(user);
    if (user) {
      return res.status(200).json({ result: "success" });
    } else {
      let error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
  } catch (err) {
    if (!err.status) err.status = 500;
    if (!err.message) err.message = "Login failed";
    return next(err);
  }
};
