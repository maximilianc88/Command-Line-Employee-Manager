DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  --  I need to double check that the foreign keys are mapped correctly 
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id int NOT NULL,
  manager_id int NULL,
--  I need to double check that the foreign keys are mapped correctly 
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);

-- I kinda forgot why we would use this
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'penguin'

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;