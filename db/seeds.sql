INSERT INTO departments (name)
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


INSERT INTO employees (first_name, last_name, role_id, manager_id, is_manager)
VALUES 
('Krista', 'Francis', 1, null, 1),
('Jackson', 'Salgado', 2, 1, 0),
('Beth', 'Thompson', 3, 1, 0),
('Stephanie', 'Spangler', 4, 5, 0),
('Franklin', 'Francis', 5, null, 1),
('Carolynn', 'Ray', 6, 5, 0),
('Lisa', 'Browne', 7, 5, 0),
('Steve', 'Kennedy', 8, 5, 0),
('Felipe', 'Tellez', 9, 5, 0),
('Kasey', 'Hill', 10, null, 1),
('Gelene', 'Tracy', 11, 10, 0),
('Roger', 'Kincaid', 12, 10, 0),
('Regina', 'Heustress', 13, 10, 0);