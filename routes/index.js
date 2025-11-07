const express = require("express");
// const app = express();
const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("API FOOTBALL");
});

routes.use("/", require("./swagger"));

routes.use("/team", require("./teamRoutes"));
routes.use("/player", require("./playerRoutes"));

module.exports = routes;
