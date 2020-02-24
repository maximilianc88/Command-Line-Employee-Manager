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
  viewAllDpt: "View all employees by department",
  viewAllMgr: "View all employees by their manager",
  addNewb: "Add employee",
  remNewb: "Remove employee",
  updateRole: "Update employee role",
  updateMgr: "Update employee manager"
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
  return;
});

function table(message, response) {
  return console.table(message, response);
};

// view employees
function viewEmployees() {
  const query = connection.query('SELECT * FROM employee LEFT JOIN role on role.id = role_id', (err, res)=>{
      if (err) throw err;
      console.table("View Employees", res, "press any key");
  });
};

viewEmployees();

connection.end();