//this is where all the codey code will go. We are talking about some routes go get data, post up some new data, get and join data. I also need to see wazzup with console tablez

"use strict";

const mysql = require("mysql");
const inquirer = require("inquirer");

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
  prompt();
});

function prompt() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        promptMessages.viewAll,
        promptMessages.viewAllDpt,
        promptMessages.viewAllMgr,
        promptMessages.addNewb,
        promptMessages.remNewb,
        promptMessages.updateRole,
        promptMessages.updateMgr,
        promptMessages.exit
      ]
    })
    .then(answer => {
      console.log("answer", answer);
      switch (answer.action) {
        case promptMessages.viewAll:
      //  new function
          break;

        case promptMessages.viewAllDpt:
      //  new function
          break;

        case promptMessages.viewAllMgr:
    //  new function
          break;

        case promptMessages.addNewb:
      //  new function
          break;

        case promptMessages.remNewb:
       //  new function
          break;

        case promptMessages.updateRole:
      //  new function
          break;

        case promptMessages.updateMgr:
         //  new function
          break;

        case promptMessages.exit:
          connection.end();
          break;
      }
    });
}
