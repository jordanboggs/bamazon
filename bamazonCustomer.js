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

// connection.query('QUERY ?', [values], function(err, res))

// Prompt customer to pick an item to buy
connection.query("SELECT * FROM products", function(err, res) {
  if (err) console.log(colors.red(err));

  let products = [];
  let printProducts = [];
  for (let i = 0; i < res.length; i++) {
    products.push(res[i]);
    printProducts.push(
      `ID: ${res[i].item_id}  Product: ${res[i].product_name}  Price: ${res[i].price}`
    );
  }
  inquirer.prompt([
    {
      type: 'list',
      name: 'productId',
      message: 'Which product would you like to buy?',
      choices: printProducts
    },
    {
      type: 'input',
      name: 'desiredQuant',
      message: "How many would you like to buy?"
    }
  ]).then(answers => {
    const productPrintout = answers.productId;
    console.log("productPrintout",productPrintout);
    const desiredQuant = answers.desiredQuant; 

    const productIndex = findIndexOfProduct(printProducts, productPrintout);
    console.log("the index is",productIndex);
    
    // if (desiredQuant <= product.stock_quantity) {
    //   // reduce the stock_quantity on DB by desiredQuant
    // }
    // else {
    //   // log Sorry, we only have <quant> in stock
    // }
  });
  connection.end();
});

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
