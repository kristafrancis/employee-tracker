DROP TABLE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;


CREATE TABLE departments (
    departments_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    departments_name VARCHAR(30) NOT NULL 
);

CREATE TABLE roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    departments_id INTEGER,
    departments_name VARCHAR(30),
    CONSTRAINT fk_departments FOREIGN KEY (departments_id) REFERENCES departments(departments_id) ON DELETE CASCADE,
    CONSTRAINT fk_departments FOREIGN KEY (departments_name) REFERENCES departments(departments_name) ON DELETE CASCADE
);

CREATE TABLE employees (
    employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    manager_id INTEGER,
    manager_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE SET NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager_name) REFERENCES employee(employee_id) ON DELETE SET NULL
);



