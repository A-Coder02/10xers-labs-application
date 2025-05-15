require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");
const helloRouter = require("./routes/hello");
const productRouter = require("./routes/products.route");

const app = express();

// middlwares
app.use(express.json());
// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// routes
app.use("/hello", helloRouter);
app.use("/products", productRouter);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`app is running on PORT:${PORT}`));
