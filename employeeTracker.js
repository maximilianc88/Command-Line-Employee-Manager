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
  remNewb: "Remove employee",
  updateRole: "Update employee role",
  updateMgr: "Update employee manager",
  exit: "Later gator!"
};

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
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


      // view employees
function viewAll() {
  const query = connection.query('SELECT * FROM employee LEFT JOIN role on role.id = role_id', (err, res)=>{
      if (err) throw err;
      console.table("View Employees", res);
  });}

  function viewAllDpt() {
    const query = connection.query( "SELECT * FROM department", (err, res)=>{
      if (err) throw err;
      console.table("View Departments", res);
    });}

    function viewAllRole() {
      const query = connection.query("SELECT * FROM role", (err, res)=>{
        if (err) throw err;
        console.table("View Roles", res);
      });}
