#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
    DROP TABLE IF EXISTS groceries;
    DROP TABLE IF EXISTS categories;
    
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR ( 255 )
    );

    CREATE TABLE IF NOT EXISTS groceries (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR ( 255 ) NOT NULL UNIQUE,
        price DECIMAL (10, 2) NOT NULL,
        stock INTEGER DEFAULT 0,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    INSERT INTO categories (name)
    VALUES ('Frozen');
    INSERT INTO categories (name)
    VALUES ('Christmas');
    INSERT INTO categories (name)
    VALUES ('New Years');

    INSERT INTO groceries (name, price, stock, category_id)
    VALUES ('Frozen Turkey', 34.22, 41, 1);
    INSERT INTO groceries (name, price, stock, category_id)
    VALUES ('Christmas Cookies', 25.50, 30, 2);
    INSERT INTO groceries (name, price, stock, category_id)
    VALUES ('Treadmill', 80.00, 90, 3);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
