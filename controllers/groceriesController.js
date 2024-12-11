const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const groceryError = "One or more grcery fields contain errors";

const validateGroceryFields = [
  body("groceryName")
    .trim()
    .notEmpty()
    .isAlpha("en-US", { ignore: " " })
    .withMessage(`name - ${groceryError}`),
  body("groceryPrice")
    .notEmpty()
    .isDecimal()
    .withMessage(`price - ${groceryError}`),
  body("groceryStock")
    .notEmpty()
    .isInt()
    .withMessage(`stock - ${groceryError}`),
];

exports.getGroceryInformation = asyncHandler(async (req, res) => {
  const grocery = await db.getSpecificGrocery(Number(req.params.groceryId));

  res.render("grocery", { grocery });
});

exports.getUpdateGrocery = asyncHandler(async (req, res) => {
  const { groceryId } = req.params;
  console.log(groceryId);
  const grocery = await db.getSpecificGrocery(Number(groceryId));
  res.render("updateGrocery", { grocery });
});

exports.postUpdateGrocery = [
  validateGroceryFields,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send(groceryError);
    }

    const { groceryId } = req.params;
    const { groceryName } = req.body;
    const { groceryPrice } = req.body;
    const { groceryStock } = req.body;
    const grocery = await db.getSpecificGrocery(Number(groceryId));
    await db.updateGrocery(
      Number(groceryId),
      groceryName,
      Number(groceryPrice),
      Number(groceryStock),
      grocery[0].category_id
    );
    res.redirect("/groceries/" + groceryId);
  }),
];

exports.getDeleteGrocery = asyncHandler(async (req, res) => {
  const { groceryId } = req.params;

  const grocery = await db.getSpecificGrocery(Number(groceryId));

  res.render("deleteGrocery", { grocery });
});

exports.postDeleteGrocery = asyncHandler(async (req, res) => {
  const { groceryId } = req.params;

  await db.deleteSpecificGrocery(Number(groceryId));
  res.redirect("/categories");
});
