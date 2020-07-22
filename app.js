const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./server/routes");

const app = express();

app.use(bodyParser.json());
app.use(routes);

app.all("*", (req, res) => {
  res.status(404).send({ message: "Route not found" });
});

module.exports = app;