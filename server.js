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
    connection.query(`SELECT * FROM departments;`, 
    function(err, results) {
        console.log(results);
        console.table(results);
        startApp();
    })
};

viewAllRoles = () => {
    connection.query(`SELECT * FROM roles;`,
     function(err, results) {
        console.log(results);
        console.table(results);
        startApp();
    })
};

viewAllEmployees = () => {
    connection.query(`SELECT * FROM employees;`,
     function(err, results) {
        console.log(results);
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
            departments_name: response.newDept,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${response.newDept} successfully added to database!`);
            startApp();
        })
    })
};

addARole = () => {
    connection.query(`SELECT * FROM departments;`, (err, res) => {
        if (err) throw err;
        let departments = res.map(departments => ({name: departments.departments_name, value: departments.departments_id }));
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
            message: 'Which department would you like to add the new role to?',
            choices: departments
            },
        ]).then((response) => {
            connection.query(`INSERT INTO role SET ?`, 
            {
                title: response.title,
                salary: response.salary,
                departments_id: response.deptName,
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
                    message: 'Which employees role would you like to update?',
                    choices: employees
                },
                {
                    name: 'newRole',
                    type: 'list',
                    message: 'What is the employees new role?',
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
                    console.log(`Employees role in the database!`);
                    startApp();
                })
            })
        })
    })
}


  





