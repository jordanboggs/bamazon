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

// Prompt Supervisor to View Sales By Department or Create New Department
inquirer.prompt([
  {
    type: 'list',
    name: 'action',
    message: "Select an action:",
    choices: ["View product sales by department",
              "Create new department"]
  }
]).then(function(answer) {
  switch (answer.action) {
    case ("View product sales by department"):
      viewSalesByDept();
      break;
    case ("Create new department"):
      createDepartment();
      break;
  }
});

const viewSalesByDept = function() {
  // Set up the queries
  let query = "SELECT department_id, department_name, over_head_costs ";
  query += "FROM departments";

  console.log(colors.bold.white("department_id  department_name  " + 
    "over_head_costs  product_sales  total_profit"));

  // Do query1
  connection.query(query, function(err, res) {
    if (err) console.log(colors.red(err));

    // for loop to add to create a row for each department
    for (let i = 0; i < res.length; i++) {
      // Set up the variables for the table
      let department_id = res[i].department_id;
      let department_name = res[i].department_name;
      let over_head_costs = res[i].over_head_costs;
      let product_sales = secondQuery(res[i].department_name);
      let total_profit = product_sales - over_head_costs;

      console.log(
        `${department_id} ${department_name} ${over_head_costs} ${product_sales} ${total_profit}`
      );
    }
  });
};

const secondQuery = function(department) {
  let product_sales = 0;
  let query = "SELECT product_sales FROM products WHERE department_name = ?";

  connection.query(query, department, function(err, res) {
    if (err) console.log(colors.red(err));
    
    // Loop through results and add to product_sales
    for (let i = 0; i < res.length; i++) {
      product_sales += parseFloat(res[i].product_sales);
      console.log("product_sales",product_sales);
    }
  });
  return product_sales;
};

const createDepartment = function() {

};
