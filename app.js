require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

const { globalErrorHandler } = require("./utils/error");

const createApp = () => {
  const app = express();

  app.get("/ping", (req, res) => {
    return res.status(200).json({ message: "pong" });
  });

  app.use(express.json());
  app.use(cors());
  app.use(morgan("combined"));

  app.use(routes);
  app.use(globalErrorHandler);

  return app;
};

module.exports = { createApp };
