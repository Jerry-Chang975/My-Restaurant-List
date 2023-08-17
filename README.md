# Restaurant List

![Restaurant home page](./public/imgs/restaurant_screencut.jpg)

- A web app that you can find some restaurants and search them with keywords.
- You can also add new, update, remove your restaurant list

## Getting Started

> Ensure `Node.js` and `MySQL` is installed on your machine

1. Clone the repo

   ```bash
   $ git clone https://github.com/Jerry-Chang975/My-Restaurant-List.git
   ```

2. Go to the project directory

   ```bash
   $ cd My-Restaurant-List
   ```

3. Install the required npm packages

   ```bash
   $ npm install
   ```

4. Create config.json in config folder

   ```
   ├──config
       └──config.json
   ```

   You have to set db connection parameters in config.json

   ```json
   {
     "development": {
       "username": "your username",
       "password": "your password",
       "database": "restaurant",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

5. Create new db in your MySQL server

   ```MySQL
   CREATE DATABASE `restaurant`
   ```

6. Run DB migrations

   ```bash
   npx sequelize db:migrate
   ```

7. Add seed data

   ```bash
   npx sequelize db:seed:all
   ```

8. Start the web app

   ```bash
   $ npm run start
   ```
