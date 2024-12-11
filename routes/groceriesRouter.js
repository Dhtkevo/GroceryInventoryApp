const { Router } = require("express");
const groceriesController = require("../controllers/groceriesController");

const groceriesRouter = Router();

groceriesRouter.get("/:groceryId/update", groceriesController.getUpdateGrocery);
groceriesRouter.get("/:groceryId/delete", groceriesController.getDeleteGrocery);
groceriesRouter.get("/:groceryId", groceriesController.getGroceryInformation);
groceriesRouter.post(
  "/:groceryId/update",
  groceriesController.postUpdateGrocery
);
groceriesRouter.post(
  "/:groceryId/delete",
  groceriesController.postDeleteGrocery
);

module.exports = groceriesRouter;
