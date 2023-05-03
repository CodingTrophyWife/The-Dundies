INSERT INTO department (department_name)
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
  ('Dwight', 'Schrute', 8, ?),
  ('Michael', 'Scott', 2, ?),
  ('Pam', 'Beesly', 3, ?),
  ('Jim', 'Halpert', 2, ?),
  ('Oscar', 'Martinez', 4, ?),
  ('Kevin', 'Malone', 4, ?)
  ('Andy', 'Bernard', 5, ?),
  ('Angela', 'Martin', 4, ?),
  ('Stanley', 'Hudson', 5, ?),
  ('Toby', 'Flenderson', 1, ?),
  ('Kelly', 'Kapoor', 6, ?),
  ('Meredith', 'Palmer', 6, ?),
  ('Phyllis', 'Lapin-Vance', 5, ?),
  ('Darryl', 'Philbin', 2, ?),
  ('Roy', 'Anderson', 7, ?),
  ('Erin', 'Hannon', 3, ?),
  ('Holly', 'Flax', 1, ?);