const { Router } = require("express");
const groceriesController = require("../controllers/groceriesController");

const groceriesRouter = Router();

groceriesRouter.get("/:groceryId/update", groceriesController.getUpdateGrocery);
groceriesRouter.post(
  "/:groceryId/update",
  groceriesController.postUpdateGrocery
);
groceriesRouter.get("/:groceryId", groceriesController.getGroceryInformation);

module.exports = groceriesRouter;
