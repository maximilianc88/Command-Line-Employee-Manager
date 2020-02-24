//this is where all the codey code will go. We are talking about some routes go get data, post up some new data, get and join data. I also need to see wazzup with console tablez

"use strict";

const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

function table(message, response) {
  return console.table(message, response, "press any key");
};

const promptMessages = {
  viewAll: "View all employees",
  viewAllDpt: "View all departments",
  viewAllRole: "View all roles",
  addNewb: "Add employee",
  addRole: "Remove employee",
  addDept: "Update employee role",
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
};


function prompt() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [promptMessages.viewAll, promptMessages.viewAllDpt, promptMessages.viewAllRole, promptMessages.exit]
    })
    .then(answer => {
      console.log(answer);
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

          case promptMessages.exit:
            connection.end();
            break;
        }})};



function viewAll() {
  const query = connection.query(`SELECT employee.id, first_name, last_name, title, department.name, salary, manager_id FROM department join role ON department.id = role.department_id
  join employee ON role.id = employee.role_id order by employee.id asc;`, (err, res)=>{
      if (err) throw err;
      console.table("View Employees", res,'Press any key to continue');
  });}

  function viewAllDpt() {
    const query = connection.query( "SELECT * FROM department", (err, res)=>{
      if (err) throw err;
      console.table("View Departments", res,'Press any key to continue');
    });}

    function viewAllRole() {
      const query = connection.query("SELECT * FROM role", (err, res)=>{
        if (err) throw err;
        console.table("View Roles", res,'Press any key to continue');
      });}
