const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getCategoryPage = asyncHandler(async (req, res) => {
  const categories = await db.getAllCategories();

  res.render("allCategories", { categories: categories });
});
