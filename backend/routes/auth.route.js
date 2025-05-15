const express = require("express");
const {
  registerUser,
  loginUser,
  getAccessToken,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

// Allowed roles from enum

// Register Route
authRouter.post("/register", registerUser);

// Login Route
authRouter.post("/login", loginUser);

// Get Access Token using Refresh Token
authRouter.post("/get-access-token", getAccessToken);

module.exports = authRouter;
