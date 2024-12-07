const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getGroceryInformation = asyncHandler(async (req, res) => {
  const grocery = await db.getSpecificGrocery(Number(req.params.groceryId));

  res.render("grocery", { grocery });
});
