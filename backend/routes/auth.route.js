const express = require("express");
const {
  registerUser,
  loginUser,
  getAccessToken,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register user
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: User registered with tokens
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: User logged in with tokens
 */
/**
 * @swagger
 * /auth/get-access-token:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: New access token issued
 */

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/get-access-token", getAccessToken);

module.exports = authRouter;
