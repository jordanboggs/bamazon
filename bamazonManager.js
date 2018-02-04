const inquirer = require('inquirer');
const colors = require('colors');
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon',
  port     : 8889
});

connection.query("SELECT * FROM products", function(err, res) {
  if (err) console.log(colors.red(err));

  inquirer.prompt([
    {
      type: list,
      name: action,
      message: "Choose an action:",
      choices: ["View products for sale",
                "View low inventory",
                "Add to inventory",
                "Add new product"]
    }
  ]).then();
});
