"use strict";

const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

function table(message, response) {
  return console.table(message, response, "press any key");
}

const promptMessages = {
  viewAll: "View all employees",
  viewAllDpt: "View all departments",
  viewAllRole: "View all roles",
  addNewb: "Add employee",
  addRole: "Add role",
  addDept: "Add Department",
  updateEmployee: "Update an Employee's role",
  exit: "Later gator!"
};

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "penguin",
  database: "employeeTracker_DB"
});

connection.connect(err => {
  if (err) throw err;
  prompt();
  return;
});

function table(message, response) {
  return console.table(message, response);
}

function prompt() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        promptMessages.viewAll,
        promptMessages.viewAllDpt,
        promptMessages.viewAllRole,
        promptMessages.addNewb,
        promptMessages.addRole,
        promptMessages.addDept,
        promptMessages.updateEmployee,
        promptMessages.exit
      ]
    })
    .then(answer => {
      switch (answer.action) {
        case promptMessages.viewAll:
          viewAll();
          prompt();
          break;

        case promptMessages.viewAllDpt:
          viewAllDpt();
          prompt();
          break;

        case promptMessages.viewAllRole:
          viewAllRole();
          prompt();
          break;

        case promptMessages.addNewb:
          inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'First name',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Last name',
            },
            {
                type: 'list',
                name: 'role_id',
                message: `Role ID: \n Choose 1 for Sales Lead \n Choose 2 for Sales Person \n Choose 3 for Lead Engineer \n Choose 4 for Software Engineer \n Choose 5 for Accountant \n Choose 6 for Legal Team Lead \n Choose 7 for Lawyer`,
                choices:[1, 2, 3, 4, 5, 6, 7]
            },
            {
                type: 'list',
                name: 'manager_id',
                message: `Manager ID: \nChoose 1 for Bryan Narciso \n Choose 4 for Fatin Mohamed \n Choose 3 for Lyana Zainuddin`,
                choices:['null',1, 4, 6]
            }
        ]).then(answers => {
            let first_name = answers.first_name;
            let last_name = answers.last_name;
            let role_id = answers.role_id;
            let manager_id = JSON.parse(answers.manager_id);
            addNewb(first_name, last_name, role_id, manager_id);
            viewAll();
            prompt();
        });
        break;

        case promptMessages.addRole:
          inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Title',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Salary',
            },
            {
                type: 'list',
                name: 'department_id',
                message: `Department ID: \n Choose 1 for Sales \n Choose 2 for Engineering \n Choose 3 for Finance \n Choose 4 for Legal`,
                choices:[1, 2, 3, 4]
            }
        ]).then(answers => {
            let title = answers.title;
            let salary = answers.salary;
            let department_id = answers.department_id;
            addRole(title, salary, department_id);
            viewAllRole();
            prompt();
        });
          break;

        case promptMessages.addDept:
          inquirer.prompt([
            {
                type: 'input',
                name: 'deptName',
                message: 'New department name:',
            }
        ]).then(answers => {
            let name = answers.deptName;
            addDpt(name);
            viewAllDpt();
            prompt();
        });
          break;

          case promptMessages.updateEmployee:
            break;

        case promptMessages.exit:
          connection.end();
          break;
      }
    });
}

//view functions

function viewAll() {
  const query = connection.query(
    `SELECT employee.id, first_name, last_name, title, department.name, salary, manager_id FROM department join role ON department.id = role.department_id
  join employee ON role.id = employee.role_id order by employee.id asc;`,
    (err, res) => {
      if (err) throw err;
      console.table("View Employees", res, "Press any key to continue");
    }
  );
}

function viewAllDpt() {
  const query = connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table("View Departments", res, "Press any key to continue");
  });
}

function viewAllRole() {
  const query = connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table("View Roles", res, "Press any key to continue");
  });
}

//add functions
function addDpt(name) {
  const query = connection.query(
      "INSERT INTO department SET ?",
      { name: name },
      function(err, res) {
          if (err) throw err;
          let message = "View Departments";
          table(message, res);
      }
  );
}

function addRole(title, salary, department_id) {
  const query = connection.query(
      "INSERT INTO role SET ?",
      {
          title: title,
          salary: salary,
          department_id: department_id
      },
      function(err, res) {
          if (err) throw err;
          console.table("View Roles", res, "Press any key to continue");
      }
  )
}

function addNewb(first_name, last_name, role_id, manager_id) {
  const query = connection.query(
      "INSERT INTO employee SET ?",
      {
          first_name: first_name,
          last_name: last_name,
          role_id: role_id,
          manager_id: manager_id
      },
      function(err, res) {
          if (err) throw err;
          console.table('View Employees', res, "Press any key to continue");
      }
  )
}