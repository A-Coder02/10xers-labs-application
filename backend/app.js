require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const helloRouter = require("./routes/hello");
const productRouter = require("./routes/products.route");
const authRouter = require("./routes/auth.route");
const authMiddleware = require("./middlewares/auth.middleware");
const swaggerFile = require("./swagger-output.json");

const app = express();

// middlwares
app.use(express.json());
app.use(cors({ origin: "*" }));
// Swagger UI route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// routes
app.use("/hello", helloRouter);
app.use("/auth", authRouter);
// app.use(authMiddleware);
app.use("/products", productRouter);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`app is running on PORT:${PORT}`));
