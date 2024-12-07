const { Router } = require("express");
const groceriesController = require("../controllers/groceriesController");

const groceriesRouter = Router();

groceriesRouter.get("/");

module.exports = groceriesRouter;
