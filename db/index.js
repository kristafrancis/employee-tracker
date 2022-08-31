//const connection = require("./connections")

    
//View all departments
//viewDepartments(); {
  //  return this.connection.promise().query(
    //  'SELECT department.id, department.name FROM department;'
    //);
  //}

  //View all roles
//viewAllRoles(); {
  //  return this.connection.promise().query(
    //  'SELECT role.title, role.id, department.name AS department, role.salary FROM role;'
    //);
  //}

  //view all employees
  //viewAllEmployees(); {
    //return this.connection.promise().query(
      //'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name, manager.last_name AS manager;'
    //);
  //}

  //add a department
  //createADepartment(department); {
    //return this.connection.promise().query("INSERT INTO department SET ?", department);
  //}

  //add a role
  //createARole(role); {
    //return this.connection.promise().query("INSERT INTO role SET ?", role);
  //}

  //add an employee
  //createAnEmployee(employee); {
    //return this.connection.promise().query("INSERT INTO employee SET ?", employee);
//}

  //update employee role
  //updateAnEmployeeRole(employeeId, roleId); {
    //return this.connection.promise().query(
      //"UPDATE employee SET role_id = ? WHERE id = ?",
      //[roleId, employeeId]
    //);
  //}

  //module.exports = new DB(connection);
    