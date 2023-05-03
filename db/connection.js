const mysql = require("mysql2");

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "dunder_mifflin_db",
  },
  console.log("You are connected to the Database")
);

module.exports = connection;