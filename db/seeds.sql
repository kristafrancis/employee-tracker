USE employees;

INSERT INTO department (department_name)
VALUES 
('Operations Management'),
('Finance'),
('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Director of Operations', 175000, 1),
('Assistant to the DO', 80000, 1),
('Secretary to the DO', 50000, 1),
('Financial Analyst', 85000, 2),
('Senior Accountant', 95000, 2),
('Junior Accountant', 40000, 2),
('Financial Analyst Secretary', 50000, 2),
('Accountant Secretary', 50000, 2),
('Financial Sales Representative', 80000, 2),
('VP of Marketing', 100000, 3),
('VP of Marketing Secretary', 50000, 3),
('Digital Marketing Specialist', 75000, 3),
('Assistant Digital Marketing Specialist', 60000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Krista', 'Francis', 1, null),
('Jackson', 'Salgado', 2, 1),
('Beth', 'Thompson', 3, 1),
('Stephanie', 'Spangler', 4, 2),
('Franklin', 'Francis', 5, null),
('Carolynn', 'Ray', 6, 2),
('Lisa', 'Browne', 7, 2),
('Steve', 'Kennedy', 8, 2),
('Felipe', 'Tellez', 9, 2),
('Kasey', 'Hill', 10, null),
('Gelene', 'Tracy', 11, 3),
('Roger', 'Kincaid', 12, 3),
('Regina', 'Heustress', 13, 3);