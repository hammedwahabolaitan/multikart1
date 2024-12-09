
const mysql = require("mysql");
const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "e-commerce"
  });
  database.connect(function(err){
    console.log(err)
  })

  module.exports = database;