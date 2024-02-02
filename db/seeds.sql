INSERT INTO department (name)
VALUES 
    ("Finance"),
    ("Human Resources"),
    ("Legal"),
    ("Marketing"),
    ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES     
    ('Software Engineer', 80000.00, 1),
    ('Marketing Specialist', 60000.00, 2),
    ('Sales Representative', 70000.00, 3),
    ('Data Analyst', 65000.00, 1),
    ('HR Manager', 75000.00, 2),
    ('Customer Support Specialist', 55000.00, 3),
    ('Product Manager', 90000.00, 1),
    ('Finance Analyst', 72000.00, 2),
    ('Operations Coordinator', 60000.00, 3);

              
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Robert', 'Johnson', 3, 2),
    ('Emily', 'Davis', 4, 3),
    ('Michael', 'Williams', 5, 2),
    ('Sophia', 'Jones', 6, 1),
    ('Daniel', 'Brown', 7, 3),
    ('Olivia', 'Taylor', 8, 3),
    ('William', 'Anderson', 9, 1);
       