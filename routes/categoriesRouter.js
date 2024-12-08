const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/new", categoriesController.getCreateCategoryForm);

categoriesRouter.get(
  "/:categoryId/items",
  categoriesController.getGroceriesByCategory
);

categoriesRouter.get("/", categoriesController.getCategoryPage);

categoriesRouter.post("/new", categoriesController.postNewCategory);

categoriesRouter.get(
  "/:categoryId/update",
  categoriesController.getUpdateCategory
);

categoriesRouter.post(
  "/:categoryId/update",
  categoriesController.postUpdateCategory
);

categoriesRouter.get(
  "/:categoryId/delete",
  categoriesController.getDeleteCategory
);

categoriesRouter.post(
  "/:categoryId/delete",
  categoriesController.postDeleteCategory
);

module.exports = categoriesRouter;
