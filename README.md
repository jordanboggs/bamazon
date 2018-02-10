# bamazon
*Your Electronics and Snacks Superstore*

## How to use
bamazon comes with three interfaces:
1. The customer interface **bamazonCustomer.js**
1. The manager interface **bamazonManager.js**
1. The supervisor interface **bamazonSupervisor.js**

### bamazonCustomer
![Image of bamazonCustomer interface](https://i.imgur.com/LiZCiAw.gif)
bamazonCustomer offers one interface option which allows users to select an item for purchase and enter a quantity. If there is sufficient stock, the item will be purchased and the stock lowered appropriately. If there is insufficient stock, the user will be informed.

### bamazonManager
![Image of bamazonManager interface](https://i.imgur.com/5ZiULlG.gif)
bamazonManager offers four interface options:
1. View products for sale
1. View low inventory
1. Add to inventory
1. Add new product

#### View products for sale
This option lists each item for sale, its price, and the quantity in stock.

#### View low inventory
This option lists each item that has fewer than 5 items in stock.

#### Add to inventory
This option prompts the user to add more stock to an item's inventory.

#### Add new product
This option prompts the user to inter a product name, price, and stock. The ID will be automatically generated.

### bamazonSupervisor
![Image of bamazonSupervisor interface](https://imgur.com/IF8GXUW.gif)
bamazonSupervisor offers two interface options: 
1. View product sales by department
1. Create new department

#### View product sales by department
This option lists a table with each department, its overhead costs, its product sales, and its calculated total profit.

#### Create new department
This option will allow the user to add a new department to the departments table, in addition to its overhead costs. This is useful if a Manager adds a new product with a novel department name. In order for an entry to appear in **View product sales by department**, a department name must be entered in both of these places.