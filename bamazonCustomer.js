const inquirer = require('inquirer');
const colors = require('colors');
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon',
  port: 8889
});

// connection.query('QUERY ?', [values], function(err, res))

// Prompt customer to pick an item to buy
connection.query("SELECT * FROM products", function(err, res) {
  if (err) console.log(err);

  let products = [];
  for (let i = 0; i < res.length; i++) {
    products.push(
      `ID: ${colors.white(res[i].item_id)}  Product: ${res[i].product_name}  Price: ${colors.blue(res[i].price)}`
    );
  }
  inquirer.prompt([
    {
      type: 'list',
      name: 'productId',
      message: 'Which product would you like to buy?',
      choices: products
    },
    {
      type: 'input',
      name: 'desiredQuant',
      message: "How many would you like to buy?"
    }
  ]).then(answers => {
    const product = answers.productId;
    const desiredQuant = answers.desiredQuant; 
  });
});
