const connection = require("./connections")

    
//View all departments
findAllDepartments(); {
    return this.connection.promise().query(
      'SELECT department.id, department.name FROM department;'
    );
  }
    