INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"),("legal");

INSERT INTO role (title, salary, department_id)
VALUES ("sales lead", 100000, 1), ("sales person", 80000, 1), ("lead engineer", 150000, 2), ("software engineer", 120000, 2), ("accountant", 125000, 3), ("Legal team lead", 250000, 4), ("Lawyer", 190000, 4);

INSERT INTO employee (first_name,last_name, role_id, manager_id)
VALUES ("Bryan", "Narciso", 1, null),("Muaz", "Narciso", 2, 1),("Lyana", "Zainuddin", 6, null), ("Fatin", "Mohamed", 3, null), ("Niyah", "Dement", 4, 4), ("Tom", "Allen", 5, null), ("John", "Doe", 6, null), ("Mike", "Chen", 7, 3), ("Sarah", "Lourd", 7, 3);