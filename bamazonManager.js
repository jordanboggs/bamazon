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

// Prompt manager for action
inquirer.prompt([
  {
    type: "list",
    name: "action",
    message: "Choose an action:",
    choices: ["View products for sale",
              "View low inventory",
              "Add to inventory",
              "Add new product"]
  }
]).then(function(answer) {
  switch (answer.action) {
    case ("View products for sale"):
      viewProducts();
      break;
    case ("View low inventory"):
      viewLowInventory();
      break;
  }
});

// list every available item: the item IDs, names, prices, and quantities
const viewProducts = function() {
  let query = "SELECT id, product_name, price, stock_quantity FROM products";
  connection.query(query, function(err, res) {
    if (err) {
      console.log(colors.red(err));
    }
    else {
      for (let i = 0; i < res.length; i++) {
        console.log(
          `ID: ${res[i].id} Product: ${res[i].product_name} Price: $` + 
          `${res[i].price} Inventory: ${res[i].stock_quantity}`
        );
      }
    }
  });
  connection.end();
};

// list all items with an inventory count lower than five.
const viewLowInventory = function() {
  let query = "SELECT id, product_name, price, stock_quantity FROM products ";
  query += "WHERE stock_quantity < 5";
  connection.query(query, function(err, res) {
    if (err) {
      console.log(colors.red(err));
    }
    else {
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          console.log(
            `ID: ${res[i].id} Product: ${res[i].product_name} Price: $` + 
            `${res[i].price} Inventory: ${res[i].stock_quantity}`
          );
        }  
      }
      else {
        console.log(colors.green("No items are low stock."));
      }
    }
  });
  connection.end();
};
