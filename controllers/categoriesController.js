const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getCategoryPage = asyncHandler(async (req, res) => {
  const categories = await db.getAllCategories();

  res.render("allCategories", { categories: categories });
});

exports.getGroceriesByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await db.getSpecificCategory(Number(categoryId));
  const groceries = await db.getAllGroceriesUnderCategory(Number(categoryId));

  //console.log({ category, groceries }.category[0]);
  console.log({ category, groceries });

  res.render("allGroceriesCategory", { category, groceries });
});
