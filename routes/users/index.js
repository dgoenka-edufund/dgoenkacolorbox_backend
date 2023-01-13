const express = require("express");
const router = express.Router();

const { getUsersCollection } = require("../../util/db");
const login = require("./login/api");

router.post("/login", login);

module.exports = router;
