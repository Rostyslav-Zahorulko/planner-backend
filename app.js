const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const projectsRouter = require("./routes/api/projects");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectsRouter);
// SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, _req, res, _next) => {
  const status = err.status ? "error" : "fail";
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ status, code: statusCode, message: err.message });
});

module.exports = app;
