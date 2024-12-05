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

module.exports = {
  getAllCategories,
};
