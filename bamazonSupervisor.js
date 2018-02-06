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
};

const createDepartment = function() {

};

/*
USE bamazon;

SELECT departments.department_id, products.department_name, 
  departments.over_head_costs, 	products.product_sales, 
  (products.product_sales - departments.over_head_costs) AS total_profit
FROM products
INNER JOIN departments ON departments.department_name = products.department_name
GROUP BY department_name
*/
