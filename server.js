const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require ("./db");
const mysql = require("mysql2");

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password 
    password: 'root',
    database: 'employees',
    port: 3306
  });

connection.connect(function(err){
    if(err) throw err;
    startApp();
  });

startApp = () => {

    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employees role', 'All Done']
        }
    ]).then(res => {
        let choices = res.choices;
        switch (choices) {
            case 'View all departments':
                viewAllDepartments();    
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addADepartment();
            break;
            case 'Add a role':
                addARole();
            break;
            case 'Add an employee':
                addAnEmployee();
            break;
            case 'Update employee role':
                updateEmployeeRole();
            break;
            case 'All Done':
                connection.end();
                console.log('Have a wonderful day!');
                return;
            default:
                break;
        }
    })
}

viewAllDepartments = () => {
    connection.query(`SELECT * FROM department ORDER BY department_id;`, 
    function(err, results) {
        console.table(results);
        startApp();
    })
};

viewAllRoles = () => {
    connection.query(`SELECT role.role_id, role.title, role.salary, department.department_name, department.department_id FROM role JOIN department ON role.department_id = department.department_id ORDER BY role.role_id;`,
     function(err, results) {
        console.table(results);
        startApp();
    })
};

viewAllEmployees = () => {
    connection.query(`SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.employee_id JOIN role ON e.role_id = role.role_id JOIN department ON department.department_id = role.department_id ORDER BY e.employee_id ASC;`,
     function(err, results) {
        console.table(results);
        startApp();
    })
};


addADepartment = () => {
    inquirer.prompt([
        {
        name: 'newDepartment',
        type: 'input',
        message: 'What is the name of the department you want to add?'   
        }
    ]).then((response) => {
        connection.query(`INSERT INTO department SET ?`, 
        {
            department_name: response.newDept,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${response.newDept} successfully added to database!`);
            startApp();
        })
    })
};

addARole = () => {
    connection.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        let departments = res.map(department => ({name: department.department_name, value: department.department_id }));
        inquirer.prompt([
            {
            name: 'title',
            type: 'input',
            message: 'What is the name of the role you want to add?'   
            },
            {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role you want to add?'   
            },
            {
            name: 'departmentName',
            type: 'list',
            message: 'Which department do you want to add the new role to?',
            choices: departments
            },
        ]).then((response) => {
            connection.query(`INSERT INTO role SET ?`, 
            {
                title: response.title,
                salary: response.salary,
                department_id: response.deptName,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${response.title} successfully added to database!`);
                startApp();
            })
        })
    })
};

addAnEmployee = () => {
    connection.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.role_id }));
        connection.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id}));
            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the new employees first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the new employees last name?'
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'What is the new employees title?',
                    choices: roles
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Who is the new employees manager?',
                    choices: employees
                }
            ]).then((response) => {
                connection.query(`INSERT INTO employee SET ?`, 
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.role,
                    manager_id: response.manager,
                }, 
                (err, res) => {
                    if (err) throw err;
                })
                connection.query(`INSERT INTO role SET ?`, 
                {
                    department_id: response.dept,
                }, 
                (err, res) => {
                    if (err) throw err;
                    console.log(`${response.firstName} ${response.lastName} successfully added to database!`);
                    startApp();
                })
            })
        })
    })
};

updateEmployeeRole = () => {
    connection.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.role_id }));
        connection.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'Which employee would you like to update the role for?',
                    choices: employees
                },
                {
                    name: 'newRole',
                    type: 'list',
                    message: 'What should the employees new role be?',
                    choices: roles
                },
            ]).then((response) => {
                connection.query(`UPDATE employee SET ? WHERE ?`, 
                [
                    {
                        role_id: response.newRole,
                    },
                    {
                        employee_id: response.employee,
                    },
                ], 
                (err, res) => {
                    if (err) throw err;
                    console.log(`Successfully updated employees role in the database!`);
                    startApp();
                })
            })
        })
    })
}


  





