const express = require("express");
const {
  registerUser,
  loginUser,
  getAccessToken,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/get-access-token", getAccessToken);

module.exports = authRouter;
