const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const categoryNameNotEmpty =
  "Category name must be provided and can only contain letters";

const validateCategoryName = [
  body("categoryName")
    .trim()
    .notEmpty()
    .isAlpha("en-US", { ignore: " " })
    .withMessage(categoryNameNotEmpty),
];

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

exports.postNewCategory = [
  validateCategoryName,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send("ERROR UPDATING CATEGORY");
    }
    await db.createCategory(req.body.categoryName);
    res.redirect("/categories");
  }),
];

exports.getUpdateCategory = asyncHandler(async (req, res) => {
  const categId = req.params.categoryId;
  const category = await db.getSpecificCategory(Number(categId));
  res.render("updateCategory", { category });
});

exports.postUpdateCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;
  const { categoryId } = req.body;

  await db.updateSpecificCategory(categoryName, Number(categoryId));
  res.redirect("/categories/" + categoryId + "/items");
});

exports.getDeleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await db.getSpecificCategory(Number(categoryId));

  res.render("deleteCategory", { category });
});

exports.postDeleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.body;

  await db.deleteSpecificCategory(Number(categoryId));
  res.redirect("/categories");
});

exports.getCreateGroceryForCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await db.getSpecificCategory(Number(categoryId));

  res.render("createGrocery", { category });
});

exports.postCreateGroceryForCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { groceryName } = req.body;
  const { groceryPrice } = req.body;
  const { groceryStock } = req.body;

  await db.createGrocery(
    groceryName,
    Number(groceryPrice),
    Number(groceryStock),
    Number(categoryId)
  );

  res.redirect(`/categories/${categoryId}/items`);
});
