# 1. Set up basic express project structure \*\*

    - Create necessary folders **
        - Create database, controllers, views, and routes folders **
    - Create necessary files within those folders
        - database folder: pool, query, seed files **
        - controllers folder: item controller, category controller, index controller **
        - routes folder: item router, category router, index router **
        - views folder: index (main), all categories, all items, specific category, specific item, create category form, create item form **

# 2. Set up PostgreSQL database

    - Create connection pool
    - Add/Create connection string in .env file
    - Create query file with necessary queries for each CRUD operation
    - Create population script file to create category and item tables and insert dummy data for each
    - Implement necessary constraints for tables
