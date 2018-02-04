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
  let query1 = "SELECT department_id, department_name, over_head_costs ";
  query1 += "FROM departments";

  let query2 = "SELECT product_sales FROM products WHERE department_name = ?";

  // Set up the variables for the table
  let department_id;
  let department_name = "";
  let over_head_costs;
  let product_sales;
  let total_profit;

  // Do query1
  connection.query(query1, function(err, res) {
    if (err) console.log(colors.red(err));

    // Set values for the table
    department_id = res.department_id;
    department_name = res.department_name;
    over_head_costs = res.over_head_costs;

    // for loop to add to product_sales by department
    for (let i = 0; i < res.length; i++) {
      product_sales += secondQuery(res[i].department_name);
    }
  });
  connection.end();
};

const secondQuery = function(department) {
  let product_sales = ;
  return product_sales;
};

const createDepartment = function() {

};
