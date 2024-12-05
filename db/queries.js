const pool = require("./pool");

// Implement postgreSQL queries for categories table

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getSpecificCategory(categoryId) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    categoryId,
  ]);
  return rows;
}

async function createCategory(name) {
  await pool.query("INSERT INTO categories(name) VALUES($1)", [name]);
}

async function updateSpecificCategory(name, categoryId) {
  await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [
    name,
    categoryId,
  ]);
}

async function deleteSpecificCategory(categoryId) {
  await pool.query("DELETE FROM categories WHERE id = $1", [categoryId]);
}

async function deleteAllCategories() {
  await pool.query("DELETE FROM categories");
}

// Implement postgreSQL queries for groceries table

async function getAllGroceries() {
  const { rows } = await pool.query("SELECT * FROM groceries");
  return rows;
}

async function getAllGroceriesUnderCategory(categ_id) {
  const { rows } = await pool.query(
    "SELECT * FROM groceries WHERE category_id = $1",
    [categ_id]
  );
  return rows;
}

async function getSpecificGrocery(grocery_id) {
  const { rows } = await pool.query("SELECT * FROM groceries WHERE id = $1", [
    grocery_id,
  ]);
  return rows;
}

async function createGrocery(name, price, stock, categoryId) {
  await pool.query(
    "INSERT INTO groceries(name, price, stock, categoryId) VALUES($1, $2, $3, $4)",
    [name, price, stock, categoryId]
  );
}

async function updateGrocery(grocery_id, name, price, stock, categoryId) {
  await pool.query(
    "UPDATE groceries SET name = $1, price = $2, stock = $3, categoryId = $4 WHERE groceryId = $5",
    [name, price, stock, categoryId, grocery_id]
  );
}

async function deleteSpecificGrocery(grocery_id) {
  await pool.query("DELETE FROM groceries WHERE id = $1", [grocery_id]);
}

async function deleteAllGroceriesUnderCategory(categ_id) {
  await pool.query("DELETE FROM groceries WHERE category_id = $1", [categ_id]);
}

module.exports = {
  getAllCategories,
  getSpecificCategory,
  createCategory,
  updateSpecificCategory,
  deleteSpecificCategory,
  deleteAllCategories,
  getAllGroceries,
  getAllGroceriesUnderCategory,
  getSpecificGrocery,
  createGrocery,
  updateGrocery,
  deleteSpecificGrocery,
  deleteAllGroceriesUnderCategory,
};
