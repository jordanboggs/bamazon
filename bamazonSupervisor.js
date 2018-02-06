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
      departmentPrompt();
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
  connection.end();
};

const departmentPrompt = function() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department_name',
      message: "New department name:"
    },
    {
      type: 'input',
      name: 'over_head_costs',
      message: "Overhead costs:",
      validate: function(input) {
        // Declare function as asynchronous, and save the done callback
        const done = this.async();
    
        // Do async stuff
        setTimeout(function() {
          const parsedInput = parseFloat(input);
          if (typeof parsedInput !== 'number') {
            // Pass the return value in the done callback
            done('You need to provide a number');
            return;
          }
          // Pass the return value in the done callback
          done(null, true);
        }, 3000);
      }
    }
  ]).then(function(answers) {
    const newDepartmentName = answers.department_name;
    const newOverHeadCosts = answers.over_head_costs; 
    createDepartment(newDepartmentName, newOverHeadCosts);
  });
};

const createDepartment = function(newDepartmentName, newOverHeadCosts) {
  let query = "INSERT INTO departments SET department_name = ?, ";
  query += "over_head_costs = ?";
  
  connection.query(query, [newDepartmentName, newOverHeadCosts], 
    function(err, res) {
      if (err) console.log(err)
      else console.log(colors.green("Success!"));
    }
  );
  connection.end();
};
