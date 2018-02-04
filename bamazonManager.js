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
    case ("Add to inventory"):
      addToInventoryPrompt();
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

// display a prompt that will let the manager "add more" of any item
// currently in the store.
const addToInventoryPrompt = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) console.log(colors.red(err));

    let products = [];
    let printProducts = [];
  
    // Generate menu items
    for (let i = 0; i < res.length; i++) {
      products.push(res[i]);
      printProducts.push(
        `ID: ${res[i].id}  Product: ${res[i].product_name}  Price: ${res[i].price}`
      );
    }

    // Prompt manager for which items to add stock to
    inquirer.prompt([
      {
        type: 'list',
        name: 'productId',
        message: 'Which product would you like to add to?',
        choices: printProducts
      },
      {
        type: 'input',
        name: 'desiredQuant',
        message: "How many would you like to add?"
      }
    ]).then(answers => {
      // string of menu item selected by user
      const productPrintout = answers.productId;
      // quantity user wishes to purchase
      const desiredQuant = parseInt(answers.desiredQuant); 
      // index of desired product
      const productIndex = findIndexOfProduct(printProducts, productPrintout);
      let productToPurchase = products[productIndex];
      let productId = productToPurchase.id;

      // add quantity to item
      addStockQuantity(productId, desiredQuant, productToPurchase.stock_quantity);
    });
  });
}

const findIndexOfProduct = function(printProducts, productPrintout) {
  // Match productPrintout to appropriate index of printProducts array
  // then use that index to match it to the products array
  for (let i = 0; i < printProducts.length; i++) {
    if (printProducts[i].match(productPrintout)) {
      return i;
    }
  }
  return -1;
};

const addStockQuantity = function(id, desiredQuantity, stockQuantity) {
  // reduce stock_quantity by quantity
  let query = "UPDATE products "
  query +=    "SET stock_quantity = ? ";
  query +=    "WHERE id = ?";

  newStockQuantity = stockQuantity + desiredQuantity;

  connection.query(query, [newStockQuantity, id], function(err) {
    if (err) {
      console.log(colors.red(err));
    }
    else {
      console.log(colors.green("Done!"));
      connection.end();
    }
  });
};
