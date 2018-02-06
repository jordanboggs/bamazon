const inquirer = require('inquirer');
const colors = require('colors');
const cTable = require('console.table');
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
  let query = "SELECT departments.department_id, products.department_name, ";
  query += "departments.over_head_costs, 	products.product_sales, ";
  query += "(products.product_sales - departments.over_head_costs) AS total_profit ";
  query += "FROM products ";
  query += "INNER JOIN departments ON departments.department_name ";
  query += "= products.department_name ";
  query += "GROUP BY department_name";

  let table = [];

  connection.query(query, function(err, res) {
    if (err) console.log(colors.red(err));
    
    for (let i = 0; i < res.length; i++) {
      table.push([res[i].department_id, res[i].department_name, 
                  res[i].over_head_costs, res[i].product_sales, 
                  res[i].total_profit]);
    }
    console.table(["department_id", "department_name", "over_head_costs", 
      "product_sales", "total_profit"], table);
  });
};

const createDepartment = function() {

};

/*
SELECT departments.department_id, products.department_name, 
  departments.over_head_costs, 	products.product_sales, 
  (products.product_sales - departments.over_head_costs) AS total_profit
FROM products
INNER JOIN departments ON departments.department_name = products.department_name
GROUP BY department_name
*/
