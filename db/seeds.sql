INSERT INTO department (name)
VALUES
  ('HR'),
  ('Corporate'),
  ('Reception'),
  ('Accounting'),
  ('Sales'),
  ('Quality Assurance'),
  ('Warehouse'),
  ('Dwights Made Up Department');
  
INSERT INTO role (title, salary, department_id)
VALUES
  ('Human Resources', 200, 1),
  ('Regional Manager', 90000, 2),
  ('Co-Manager', 80000, 2),
  ('Receptionist', 30000, 3),
  ('Accountant', 60000, 4),
  ('Salesperson', 130000, 5),
  ('Customer Service', 40000, 6),
  ('Delivery Driver', 45000, 7)
  ('Warehouse Manager', 75000, 2),
  ('Assistant To The Regional Manager', 50000, 8)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  (1,'Dwight', 'Schrute', 20, 2),
  (2,'Michael', 'Scott', 12, NULL),
  (3,'Pam', 'Beesly', 14, 2),
  (4,'Jim', 'Halpert', 13, 2),
  (5,'Oscar', 'Martinez', 15, 2),
  (6,'Kevin', 'Malone', 15, 2)
  (7,'Andy', 'Bernard', 16, 2),
  (8,'Angela', 'Martin', 15, 2),
  (9,'Stanley', 'Hudson', 16, 2),
  (10,'Toby', 'Flenderson', 11, NULL),
  (11,'Kelly', 'Kapoor', 17, 2),
  (12,'Meredith', 'Palmer', 17, 2),
  (13,'Phyllis', 'Lapin-Vance', 16, 2),
  (14,'Darryl', 'Philbin', 19, NULL),
  (15,'Roy', 'Anderson', 18, 14),
  (16,'Erin', 'Hannon', 14, 2),
  (17,'Holly', 'Flax', 11, NULL);