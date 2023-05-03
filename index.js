const inquirer = require('inquirer');
const db = require("./db/connection.js");

const PORT = process.env.PORT || 3001;


// the main menu that everyone sees when they run the program 
function promptUser() {
    inquirer.prompt({
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add Employee', 'Update Employee Role'],
    }
).then(function (answers) {
    switch (answers.mainMenu) {
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
      }
    });
}
//  when they click on view all employees, a table will show up with all the employees and their department and salary and manager name
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
  
//  when they click on update employee role they will have to enter the id of the employee and the new role id you want to assign to them
function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the id of the employee whose role you want to update:",
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
  
// when they click on view all roles, a table will pop up the the roles
function viewAllRoles() {
    const sql = `SELECT role.title AS title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY role.salary DESC`;
  
    db.query(sql, (err, results) => {
      if (err) throw err;
  
      console.table(results);
  
      promptUser();
    });
}
// when they click on add a role, they will be asked what the title will be and what the salary is and what department it belongs to
function addRole() {
  
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
          choices: ['HR', 'Corporate', 'Reception', 'Accounting', 'Sales', 'Quality Assurance', 'Warehouse', 'Dwights Made Up Department'],  
        },
      ])
      .then((answers) => {
       
        const query = `
          INSERT INTO role (title, salary, department_id)
          VALUES (?, ?, (SELECT id FROM department WHERE name = ?))
        `;
        const values = [answers.title, answers.salary, answers.department];
        db.query(query, values, (err, res) => {
          if (err) throw err;
     
          promptUser();
        });
      });
  }
  
// when they click on view all departments, then a table will show up with all the departments 
function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
  
    db.query(sql, (err, results) => {
      if (err) throw err;
      console.table(results);
  
  
      promptUser();
    });
  }

async function runQuery(query) {
  const results = await db.promise().query(query);
  return results[0];
}
// when they click on add employee they will be asked to enter the first name, last name, the role and the manager assigned to them
async function addEmployee() {
  var query = "SELECT id, title AS 'value' FROM role";
  var roles = await runQuery(query);
  query = "SELECT id, CONCAT(first_name, ' ',last_name) AS 'value' FROM employee";
  var employees = await runQuery(query);

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
          name: "role",
          message: "Select the employee's role:",
          choices: roles,
        },
        {
          type: "list",
          name: "manager",
          message: "Select the employee's manager (if applicable)",
          choices: ['Michael Scott', 'Toby Flenderson', 'Darryl Philbin', 'Holly Flax'],
        },
      ])
      .then((answers) => {
        // Insert the employee into the database
        const role_id = roles.find(o => o.value === answers.role).id;
        const manager_id = employees.find(o => o.value === answers.manager).id;
        const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        db.query(query, [answers.firstName, answers.lastName, role_id, manager_id], (err, res) => {
          if (err) throw err;
          console.log(`Added employee ${answers.firstName} ${answers.lastName}.`);
         
          promptUser();
        });
      });
  }
  
// when they click on add department they will be asked to name the new department 
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
      
      promptUser();
    });
  });
}       

promptUser()