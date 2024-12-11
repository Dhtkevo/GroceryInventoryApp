const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

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

exports.postUpdateGrocery = asyncHandler(async (req, res) => {
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
});
