const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(createProduct);

productRouter
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = productRouter;
