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

  res.render("allGroceriesCategory", { category, groceries });
});

exports.getCreateCategoryForm = (req, res) => {
  res.render("createCategory");
};

exports.postNewCategory = asyncHandler(async (req, res) => {
  await db.createCategory(req.body.categoryName);
  res.redirect("/categories");
});
