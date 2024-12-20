require("dotenv").config();

const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const groceriesRouter = require("./routes/groceriesRouter");
const categoriesRouter = require("./routes/categoriesRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/groceries", groceriesRouter);
app.use("/categories", categoriesRouter);
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
