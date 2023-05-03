const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require("./db/connection.js");

const PORT = process.env.PORT || 3001;



function promptUser() {
    inquirer.prompt([{
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add Employee', 'Update Employee Role'],
    }
]).then(function (questions) {
    switch (questions) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add A Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add A Department":
          addDepartment();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Quit":
          console.log("Goodbye!");
          process.exit();
      }
    });
}
 
function viewAllEmployees() {
    db.query(`
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
      ORDER BY employee.id;
    `, function (err, res) {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
  }
  

function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the ID of the employee whose role you want to update:",
          name: "employeeId",
        },
        {
          type: "input",
          message: "Enter the ID of the new role:",
          name: "roleId",
        },
      ])
      .then((res) => {
        const employeeId = parseInt(res.employeeId);
        const roleId = parseInt(res.roleId);
  
        db.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [roleId, employeeId],
          (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            promptUser();
        }
        );
      });
}
  

function viewAllRoles() {
    // Query to fetch all roles
    const sql = `SELECT role.title AS title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY role.salary DESC`;
  
    // Execute the query
    db.query(sql, (err, results) => {
      if (err) throw err;
  
      // Display the results
      console.table(results);
  
      // Call the function to display the menu again
      promptUser();
    });
}

function addRole() {
    // prompt the user for information about the new role
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the new role?",
        },
        {
          type: "list",
          name: "department",
          message: "Which department does the new role belong to?",
          choices: ['Sales','IT','Marketing','Operations','Finance','Customer Support'],  
        },
      ])
      .then((answers) => {
        // query the database to insert the new role
        const query = `
          INSERT INTO role (title, salary, department_id)
          VALUES (?, ?, (SELECT id FROM department WHERE name = ?))
        `;
        const values = [answers.title, answers.salary, answers.department];
        db.query(query, values, (err, res) => {
          if (err) throw err;
          // call the main menu again
          promptUser();
        });
      });
  }
  

function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
  
    db.query(sql, (err, results) => {
      if (err) throw err;
  
      console.table(results);
  
      // call the main menu function to allow the user to make another selection
      promptUser();
    });
  }
  
function addEmployee() {
    // Prompt the user to enter employee details
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter the employee's first name:",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter the employee's last name:",
        },
        {
          type: "list",
          name: "roleId",
          message: "Select the employee's role:",
          choices: ["Sales Lead", "IT Manager", "Marketing Lead", "Marketing Manager", "CEO", "HR", "CFO", "CTO", "Sales Manager", "Accountant", "CMO"],
        },
        {
          type: "input",
          name: "managerId",
          message: "Enter the employee's manager ID (if applicable):",
        },
      ])
      .then((answers) => {
        // Insert the employee into the database
        const roleId = getRoleIdByName(answers.roleId);
        const managerId = answers.managerId || null;
        const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        db.query(query, [answers.firstName, answers.lastName, roleId, managerId], (err, res) => {
          if (err) throw err;
          console.log(`Added employee ${answers.firstName} ${answers.lastName}.`);
          // Show the main menu again
          promptUser();
        });
      });
  }
  

function addDepartment() {
  // code to add a new department
  inquirer
  .prompt({
    type: "input",
    name: "departmentName",
    message: "Enter the name of the department:",
  })
  .then((answer) => {
    // insert the department into the database
    const query = `INSERT INTO department (name) VALUES ('${answer.departmentName}')`;
    db.query(query, (err, res) => {
      if (err) throw err;
      // return to the main menu
      promptUser();
    });
  });
}       

promptUser()