const cTable = require("console.table")
const inquirer = require("inquirer")




Inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee'],

});
//.then(userInput => {
//console.log(userInput);
//});
