const express = require("express");
const mongoose = require("mongoose");
const {
  statistics,
  getYearRanges,
  bar,
  line,
  radar,
  scatter,
  articlesIncreased,
} = require("./controller/data_controller");

const {
  validateCategories,
  validateValues,
  validateYearRanges,
  validateXYValues,
} = require("./middlewares/validationMiddlewares");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const mongoDbUrl = process.env.MONGO_DB_URL;
mongoose.connect(mongoDbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.get("/", (req, res) => {
  res.send("Hello People...");
});

app.get("/statistics", validateYearRanges, statistics);
app.get("/year-ranges", getYearRanges);
app.get("/bar", validateCategories, validateValues, validateYearRanges, bar);
app.get("/line", validateCategories, validateValues, validateYearRanges, line);
app.get("/articles-increased", articlesIncreased);
app.get("/radar", validateCategories, validateYearRanges, radar);
app.get(
  "/scatter",
  validateXYValues,
  validateCategories,
  validateYearRanges,
  scatter
);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
